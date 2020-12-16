import React, { useEffect, useRef } from 'react';

const getChildren = (containerRef) => {
  const { current } = containerRef;
  const { childNodes } = current;
  return childNodes;
};

const getChildrenLength = (containerRef) => {
  return getChildren(containerRef)?.length || 0;
};

let state = 1;

const scroll = (containerRef, OPTIONS = {}) => {
  const childNodes = getChildren(containerRef);
  const { height } = childNodes[0].getBoundingClientRect();
  const length = getChildrenLength(containerRef);
  const { during = 2000 } = OPTIONS;

  childNodes.forEach((item) => {
    item.style.transform = `translateY(-${height * (state % length)}px)`;
    item.style.transition = `all ${during}ms ease-out`;
  });

  state += 1;

  childNodes[length - 1].addEventListener('transitionend', () => {
    let index = 0;
    while (index < length) {
      if (index < (state - 1) % length) {
        childNodes[index].style.transform = `translateY(${height}px)`;
        childNodes[index].style.transition = null;
        index += 1;
        // eslint-disable-next-line no-continue
        continue;
      }

      childNodes[index].style.transform = `translateY(-${height * (state % length || length)}px)`;
      childNodes[index].style.transition = `all ${during}ms ease-out`;
      index += 1;
    }

    if ((state - 1) % length === 0) {
      childNodes[length - 1].style.transform = `translateX(${1000}px)`;
    }

    if (state % length === 0) {
      childNodes[0].style.transform = `translateY(${0}px)`;
      childNodes[0].style.transition = `all ${during}ms ease-out`;
      childNodes[1].style.transform = `translateY(${0}px)`;
    }

    state += 1;
  }, false);
};

export default function useListScrolling(OPTIONS) {
  const containerRef = useRef();
  const { current } = containerRef;

  useEffect(() => {
    if (current?.childNodes && current?.childNodes?.length) {
      if (current?.childNodes?.length === 1) {
        const childNodes = getChildren(containerRef);
        current.appendChild(childNodes[0].cloneNode(true));
      }

      scroll(containerRef, OPTIONS);
    }
  }, [current?.childNodes]);

  return containerRef;
}
