// Adapted from https://github.com/tverdohleb/react-trivial-timeline [MIT]

import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";

const e = React.createElement;

const StyledContainer = styled.div``;

const StyledList = styled.ul`
  max-width: 95%;
  list-style: none;
  padding: 0px;
`;

const StyledItem = styled.li`
  position: relative;
`;

const StyledIcon = styled.div<{
  lineColor: string | null;
  iconFill: string | null;
}>`
  border: ${(props) => {
    if (props.lineColor === null) {
      return "none";
    }
    return `2px solid ${props.lineColor}`;
  }};
  padding: ${(props) => {
    if (props.lineColor === null) {
      return "2px";
    }
    return "0px";
  }};
  background: ${(props) => props.iconFill};
  border-radius: 10px;
  margin-left: 2px;
  display: block;
  width: 1em;
  height: 1em;
`;

type IntervalProps = {
  interval: string | { start: string; end: string };
  separator: string | React.ReactNode;
};

const Interval = ({ interval, separator }: IntervalProps) => {
  if (typeof interval === "string") {
    return <>{interval}</>;
  }
  if (interval.start && interval.end) {
    return (
      <>
        {interval.start}
        {separator}
        {interval.end}
      </>
    );
  }
  if (!interval.start && interval.end) {
    return (
      <>
        now
        {separator}
        {interval.end}
      </>
    );
  }
  if (interval.start && !interval.end) {
    return (
      <>
        {interval.start}
        {separator}
        now
      </>
    );
  }
  return null;
};

const StyledContent = styled.div<{ lineColor: string }>`
  position: relative;
  margin-left: 2.5em;
  :before {
    background-color: ${(props) => props.lineColor};
    content: "";
    margin-left: 1px;
    position: absolute;
    top: 0;
    left: -2em;
    width: 2px;
    height: 100%;
  }
`;
const StyledInterval = styled.p<{ background: string }>`
  margin: 0 0 0 1em;
  padding: 0.25em 1em;
  background: ${(props) => props.background};
  color: ${(props) => props.color};
  border-radius: 5px;
`;

const StyledTitle = styled(({ tag, children, ...props }) =>
  e(tag, props, children)
)`
  margin-top: 0;
`;

StyledTitle.defaultProps = {
  tag: "h1",
};

const StyledDescription = styled.div``;
const StyledSubtitle = styled(({ tag, children, ...props }) =>
  e(tag, props, children)
)``;
StyledSubtitle.defaultProps = {
  tag: "h4",
};
const StyledIntervalContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin: 1em 0;
  align-items: center;
`;

type TimelineProps = {
  lineColor: string;
  intervalSeparator: React.ReactNode;
  children: React.ReactNode;
};

export const Timeline = ({
  lineColor,
  intervalSeparator,
  children,
}: TimelineProps) => {
  const childrenWithProps = React.Children.map(children, (child) =>
    // @ts-expect-error
    React.cloneElement(child, {
      // @ts-expect-error
      lineColor: child.props.lineColor || lineColor,
      // @ts-expect-error
      intervalSeparator: child.props.intervalSeparator || intervalSeparator,
    })
  );
  return (
    <StyledContainer>
      <StyledList>{childrenWithProps}</StyledList>
    </StyledContainer>
  );
};
Timeline.propTypes = {
  lineColor: PropTypes.string,
  intervalSeparator: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  children: PropTypes.node,
};
Timeline.defaultProps = {
  intervalSeparator: <>&nbsp;&mdash; </>,
  children: null,
};

type EventProps = {
  title: string;
  subtitle: string;
  interval: string | { start: string; end: string };
  intervalSeparator: string | React.ReactNode;
  children: React.ReactNode;
  lineColor: string;
  titleTag: string;
  subtitleTag: string;
  intervalColor: string;
  intervalBackground: string;
  iconFill: string;
  iconOutline: string | null | undefined;
};

export const Event = ({
  title,
  subtitle = "",
  interval = "Pending",
  children = null,
  lineColor,
  titleTag = "h1",
  subtitleTag = "h4",
  intervalColor = "#000000",
  intervalSeparator = <>&nbsp;&mdash; </>,
  intervalBackground,
  iconFill = "transparent",
  iconOutline = undefined,
}: EventProps) => (
  <StyledItem>
    <StyledIntervalContainer>
      <StyledIcon
        lineColor={iconOutline === null ? null : iconOutline || lineColor}
        iconFill={iconFill}
      />
      <StyledInterval color={intervalColor} background={intervalBackground}>
        <Interval interval={interval} separator={intervalSeparator} />
      </StyledInterval>
    </StyledIntervalContainer>
    <StyledContent lineColor={lineColor}>
      <StyledTitle tag={titleTag} className="text-xl">
        {title}
      </StyledTitle>
      {subtitle && (
        <StyledSubtitle tag={subtitleTag}>{subtitle}</StyledSubtitle>
      )}
      <StyledDescription>{children}</StyledDescription>
    </StyledContent>
  </StyledItem>
);
