/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from "@emotion/react";
import { FC } from "react";

const style = css`
  color: hotpink;
`;

const SomeComponent: FC = ({ children }) => (
  <div css={style}>
    Some hotpink text.
    {children}
  </div>
);

const anotherStyle = css({
  textDecoration: "underline",
});

const AnotherComponent = () => (
  <div css={anotherStyle}>Some text with an underline.</div>
);

const EmotionTest: FC = () => {
  return (
    <SomeComponent>
      <AnotherComponent />
    </SomeComponent>
  );
};

export default EmotionTest;
