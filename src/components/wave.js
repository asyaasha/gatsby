import React, { useState } from 'react';
import { css } from '@emotion/core';

const Wave = () => {
  const [waves, setWaves] = useState(0);
  const label = `👋 ${waves}`;

  return (
    <button
      css={css`
        border: none;
        color: white;
        font-size: 1rem;
      `}
      onClick={() => setWaves(waves + 1)}
    >
      {label}
    </button>
  );
};

export default Wave;
