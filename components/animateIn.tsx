"use client";

import React, {
  useState,
  useEffect,
  useRef,
  Children,
  cloneElement,
  useCallback,
} from 'react';
import { motion } from 'framer-motion';
import { useSwiperContext } from '@/lib/hooks/useSwiper';

// 定义组件的 Props 类型
type SpaceToFadeInProps = {
  children: React.ReactNode;
  pageNum: number;
};

/**
 * A React component that animates its leaf children (li, span, img) to appear one by one on spacebar press.
 * A leaf element is considered an element that does not have other React elements as children (text content is allowed).
 *
 * @param {object} props - The component props.
 * @param {React.ReactNode} props.children - The content to be wrapped and animated.
 * @returns {React.ReactElement} The component with animated children.
 */
const SpaceToFadeIn: React.FC<SpaceToFadeInProps> = ({ children, pageNum }) => {
  // State to keep track of how many elements should be visible
  const [visibleCount, setVisibleCount] = useState<number>(0);
  const context = useSwiperContext();

  // A ref to count the animatable elements during the render phase
  const elementCounter = useRef<number>(0);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    // Listen for the spacebar
    if (e.code === 'Space') {
      e.preventDefault(); // Prevent default browser behavior (e.g., scrolling)
      console.log(elementCounter.current, visibleCount, context.swiperInstance?.activeIndex, pageNum);
      if (context.swiperInstance && visibleCount >= elementCounter.current) {
        context.swiperInstance.slideNext();
        elementCounter.current = 0; // Reset the counter after sliding
      } else if (pageNum === context.swiperInstance?.activeIndex) {
        setVisibleCount((prevCount) => prevCount + 1);
      }
    }
  }, [visibleCount, elementCounter, pageNum, context]);

  useEffect(() => {
    // Add event listener
    window.addEventListener('keydown', handleKeyDown);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]); // Empty dependency array ensures this effect runs only once

  /**
   * Recursively maps over children to wrap target elements with motion components.
   * @param {React.ReactNode} nodes - The children to map over.
   * @returns {React.ReactNode} The mapped children with motion components.
   */
  const recursiveMap = (nodes: React.ReactNode): React.ReactNode => {
    return Children.map(nodes, (child) => {
      // Use React's type guard to ensure child is a valid element we can inspect
      if (!React.isValidElement(child)) {
        return child;
      }

      // We define a "leaf" element as one that doesn't have other elements as children.
      // It can have text content.
      const isLeaf =
        !child.props.children ||
        typeof child.props.children === 'string' ||
        (Array.isArray(child.props.children) &&
          child.props.children.every((c: any) => typeof c === 'string'));

      const childType = child.type as keyof typeof motion;

      // Target all li elements (both leaf and non-leaf) and leaf span, img elements
      if ((childType === 'li') || (['span', 'img'].includes(childType) && isLeaf)) {
        // Assign a unique index to the element
        const index = elementCounter.current;
        elementCounter.current++;

        // Get the appropriate motion component (e.g., motion.li)
        const MotionComponent = motion[childType];

        const animatedElement = (
          <MotionComponent
            {...child.props}
            //@ts-ignore
            initial={{ opacity: 0 }
            }
            animate={{
              opacity: index < visibleCount ? 1 : 0,
            }}
            transition={{ duration: 0.4, ease: 'easeOut' }
            }
          />
        );

        // If it's a non-leaf li element, we need to process its children
        if (childType === 'li' && !isLeaf && child.props.children) {
          return cloneElement(animatedElement, {
            children: recursiveMap(child.props.children),
          } as { children: React.ReactNode });
        }

        return animatedElement;
      }

      // If the child has its own children, recurse
      if (child.props.children && typeof child.props.children === 'object') {
        return cloneElement(child, {
          children: recursiveMap(child.props.children),
        } as { children: React.ReactNode }); // Type assertion for cloneElement
      }

      return child;
    });
  };

  // Reset the counter before each render to ensure consistent indexing
  elementCounter.current = 0;

  return <>{recursiveMap(children)}</>;
};

export default SpaceToFadeIn;