import React from "react";

import styled from "styled-components";

const StyledSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  width: 100%;

  .Label {
    width: max-content;
    padding: 0.2rem 0.4rem;

    color: rgb(120, 120, 120);
    background-color: rgb(245, 245, 245);
    border-radius: 0.2rem;

    font-size: 0.75rem;

    user-select: none;
  }
`;

function WithSectionLabel({ children, label, labelStyle }) {
  return (
    <StyledSection>
      <p className="Label" style={labelStyle}>
        {label}
      </p>

      {children}
    </StyledSection>
  );
}

export default WithSectionLabel;
