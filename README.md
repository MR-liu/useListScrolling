# useListScrolling
useListScrolling

```
import React, { useEffect, useState } from 'react';

import useListScrolling from 'uselistscrolling';

const OPTIONS = {
  durning: 2000,
};

const ListScrolling = () => {
  const ref = useListScrolling(OPTIONS);


  return (
    <div ref={ref}>
      {...items}
    </div>
  );
};
export default ListScrolling;

```