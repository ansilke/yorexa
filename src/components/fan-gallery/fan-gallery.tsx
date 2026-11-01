
/*!
ReactDrops Component License 1.0

Copyright (c) 2026 ReactDrops
*/

'use client';

import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
  type CSSProperties,
} from 'react';

import {
  fanDefaults,
  type FanEntrance,
  type FanOptions,
} from './fan-layout';

import {
  createFanPlayback,
  type FanPlayback,
  type FanAction,
} from './fan-playback';

import type { FanLayoutInfo } from './fan-motion';

import './fan-gallery.css';

export interface FanGalleryItem {
  src: string;
  alt: string;
  href?: string;
  name?: string;
  role?: string;
}

export interface FanGalleryProps extends Partial<FanOptions> {
  items: FanGalleryItem[];
  entrance?: FanEntrance;
  radius?: number;
  speed?: number;
  stagger?: number;
  bounce?: number;
  hoverSpeed?: number;
  trigger?: 'auto' | 'scroll' | 'manual' | 'hover';
  viewportStart?: number;
  viewportStartUp?: number;
  once?: boolean;
  title?: string;
  subtitle?: string;
  showTitle?: boolean;
  ariaLabel?: string;
  onLayout?: (info: FanLayoutInfo) => void;
  className?: string;
  style?: CSSProperties;
}

export interface FanGalleryHandle {
  play: () => void;
  reset: () => void;
  finish: () => void;
  replay: () => void;
}

export const fanMotionDefaults = {
  entrance: 'stack' as FanEntrance,
  radius: 18,
  speed: 0.7,
  stagger: 0.09,
  bounce: 0.35,
  hoverSpeed: 0.28,
};

export const FanGallery = forwardRef<FanGalleryHandle, FanGalleryProps>(
  function FanGallery(
    {
      items,
      entrance = fanMotionDefaults.entrance,
      cardWidth = fanDefaults.cardWidth,
      aspectRatio = fanDefaults.aspectRatio,
      spacing = fanDefaults.spacing,
      curve = fanDefaults.curve,
      tilt = fanDefaults.tilt,
      lift = fanDefaults.lift,
      spread = fanDefaults.spread,
      stackFrom = fanDefaults.stackFrom,
      radius = fanMotionDefaults.radius,
      speed = fanMotionDefaults.speed,
      stagger = fanMotionDefaults.stagger,
      bounce = fanMotionDefaults.bounce,
      hoverSpeed = fanMotionDefaults.hoverSpeed,
      title = '',
      subtitle = '',
      showTitle = false,
      trigger = 'scroll',
      viewportStart = 75,
      viewportStartUp,
      once = true,
      ariaLabel = 'Fan gallery',
      onLayout,
      className = '',
      style,
    },
    ref,
  ) {
    const root = useRef<HTMLElement>(null);
    const stage = useRef<HTMLDivElement>(null);

    const [selectedCard, setSelectedCard] = useState(-1);

    const cards = useRef<
      (HTMLButtonElement | HTMLAnchorElement | null)[]
    >([]);

    const playback = useRef<FanPlayback | null>(null);
    const pending = useRef<FanAction | null>(null);

    useImperativeHandle(ref, () => {
      const dispatch = (action: FanAction) => {
        pending.current = action;
        playback.current?.dispatch(action);
      };

      return {
        play: () => dispatch('play'),
        reset: () => dispatch('reset'),
        finish: () => dispatch('finish'),
        replay: () => dispatch('play'),
      };
    }, []);

    const motionOptions = {
      entrance,
      cardWidth,
      aspectRatio,
      spacing,
      curve,
      tilt,
      lift,
      spread,
      stackFrom,
      radius,
      speed,
      stagger,
      bounce,
      hoverSpeed,
      trigger,
      viewportStart,
      viewportStartUp,
      once,
    };

    const latest = useRef(motionOptions);
    latest.current = motionOptions;

    const layoutCallback = useRef(onLayout);
    layoutCallback.current = onLayout;

    const cardKinds = items
      .map((item) => (item.href ? 'a' : 'b'))
      .join('');

    useEffect(() => {
      const element = root.current;
      const field = stage.current;

      if (!element || !field || !items.length) return;

      const nodes = cards.current
        .slice(0, items.length)
        .filter(
          (node): node is HTMLButtonElement | HTMLAnchorElement =>
            !!node
        );

      const controller = createFanPlayback(
        element,
        field,
        nodes,
        latest.current,
        pending,
        (info) => layoutCallback.current?.(info)
      );

      playback.current = controller;

      return () => {
        controller.destroy();
        playback.current = null;
      };
    }, [
      cardKinds,
      showTitle,
      title,
      subtitle,
      trigger,
      viewportStart,
      viewportStartUp,
      once,
    ]);

    const optionsKey = JSON.stringify(motionOptions);
    const appliedKey = useRef(optionsKey);

    useEffect(() => {
      if (appliedKey.current === optionsKey) return;

      appliedKey.current = optionsKey;
      playback.current?.update(latest.current);
    }, [optionsKey]);

    const handleCardTap = (index: number) => {
      const next = selectedCard === index ? -1 : index;

      setSelectedCard(next);
      playback.current?.activate(next);
    };

    const clearSelection = () => {
      setSelectedCard(-1);
      playback.current?.activate(-1);
    };

    return (
      <section
        ref={root}
        className={`fan-gallery ${className}`}
        style={style}
        aria-label={ariaLabel}
      >
        {showTitle && (title || subtitle) && (
          <header className="fan-gallery-heading">
            {title && <h2>{title}</h2>}
            {subtitle && <p>{subtitle}</p>}
          </header>
        )}

        <div
          ref={stage}
          className="fan-gallery-stage"
          onPointerMove={(event) => {
            if (event.pointerType === 'touch') return;

            playback.current?.point(
              event.clientX,
              event.clientY
            );
          }}
          onPointerLeave={() => {
            const focused = cards.current.findIndex(
              (node) => node === document.activeElement
            );

            if (focused === -1) {
              clearSelection();
            } else {
              playback.current?.activate(focused);
            }
          }}
          onBlur={(event) => {
            if (
              !event.currentTarget.contains(
                event.relatedTarget as Node | null
              )
            ) {
              clearSelection();
            }
          }}
        >
          {items.map((item, i) => {
            const labelPosition =
              i === 0 || i === 4 ? 'top' : 'bottom';

            const props = {
              className: `fan-gallery-card fan-gallery-card-${i + 1} ${
                selectedCard === i ? 'is-tapped' : ''
              }`,

              ref: (
                node: HTMLButtonElement | HTMLAnchorElement | null
              ) => {
                cards.current[i] = node;
              },

              'aria-label': item.alt || `Image ${i + 1}`,

              onFocus: () => {
                playback.current?.activate(i);
              },

              onClick: () => {
                handleCardTap(i);
              },

              onKeyDown: (event: React.KeyboardEvent) => {
                const next =
                  event.key === 'ArrowRight'
                    ? (i + 1) % items.length
                    : event.key === 'ArrowLeft'
                      ? (i - 1 + items.length) % items.length
                      : event.key === 'Home'
                        ? 0
                        : event.key === 'End'
                          ? items.length - 1
                          : -1;

                if (next >= 0) {
                  event.preventDefault();

                  cards.current[next]?.focus({
                    preventScroll: true,
                  });
                }

                if (event.key === 'Escape') {
                  clearSelection();

                  event.currentTarget instanceof HTMLElement &&
                    event.currentTarget.blur();
                }
              },
            };

            const image = (
              <>
                <img
                  src={item.src}
                  alt={item.alt}
                  draggable={false}
                  loading="lazy"
                  decoding="async"
                />

                {(item.name || item.role) && (
                  <span
                    className={`fan-gallery-label fan-gallery-label-${labelPosition}`}
                  >
                    {item.name && (
                      <span className="fan-gallery-label-name">
                        {item.name}
                      </span>
                    )}

                    {item.role && (
                      <span className="fan-gallery-label-role">
                        {item.role}
                      </span>
                    )}
                  </span>
                )}
              </>
            );

            return item.href ? (
              <a key={i} {...props} href={item.href}>
                {image}
              </a>
            ) : (
              <button
                key={i}
                {...props}
                type="button"
              >
                {image}
              </button>
            );
          })}
        </div>
      </section>
    );
  }
);
