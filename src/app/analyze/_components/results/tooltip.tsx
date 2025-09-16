import {
  useFloating,
  useHover,
  useFocus,
  useDismiss,
  useRole,
  useInteractions,
  offset,
  flip,
  shift,
  arrow,
  FloatingArrow,
  Placement,
  autoUpdate,
  useClick,
  size,
} from "@floating-ui/react";
import {
  cloneElement,
  isValidElement,
  ReactNode,
  useRef,
  useState,
} from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";

interface TooltipProps {
  content?: ReactNode;
  children: ReactNode;
  placement?: Placement;
  className?: string;
  arrowClassName?: string;
}

export const Tooltip = ({
  content,
  children,
  placement = "right",
  className,
  arrowClassName,
}: TooltipProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const arrowRef = useRef(null);

  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    placement,
    middleware: [
      offset(12),
      flip({
        fallbackPlacements: ["top", "bottom", "left", "right"],
      }),
      shift({
        padding: 16,
      }),
      size({
        apply({ availableWidth, availableHeight, elements }) {
          Object.assign(elements.floating.style, {
            maxWidth: `${Math.max(200, availableWidth - 32)}px`,
            maxHeight: `${Math.max(100, availableHeight - 32)}px`,
          });
        },
        padding: 16,
      }),
      arrow({
        element: arrowRef,
        padding: 8,
      }),
    ],
    whileElementsMounted: autoUpdate,
  });

  const hover = useHover(context, { move: false });
  const click = useClick(context);
  const focus = useFocus(context);
  const dismiss = useDismiss(context);
  const role = useRole(context, { role: "tooltip" });

  const { getReferenceProps, getFloatingProps } = useInteractions([
    hover,
    click,
    focus,
    dismiss,
    role,
  ]);

  const referenceElement = isValidElement(children)
    ? cloneElement(children, {
        ref: refs.setReference,
        ...getReferenceProps(),
        //@ts-ignore
        ...children.props,
      })
    : children;

  return (
    <>
      {referenceElement}

      <AnimatePresence>
        {isOpen && content && (
          <div
            ref={refs.setFloating}
            style={{
              ...floatingStyles,
              zIndex: 1000,
            }}
            {...getFloatingProps()}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{
                ease: "easeIn",
                duration: 0.2,
                bounce: 0.1,
              }}
              className={cn(
                "w-fit max-w-2xs rounded-md bg-gray-800 p-2 text-sm text-white",
                className,
              )}
            >
              <FloatingArrow
                ref={arrowRef}
                context={context}
                className={arrowClassName}
                tipRadius={2}
                height={8}
              />
              {content}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
