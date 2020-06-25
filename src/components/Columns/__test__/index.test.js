import React from 'react';
import { render } from '@testing-library/react';
import data from '../data';
import Columns from '../index';

import { ReduxWrapper } from '../../../test-helper/test-utils';

it('should render', () => {
    const { getByText } = render(<ReduxWrapper><Columns initialColumns={data} /></ReduxWrapper>);
    expect(getByText('¿Qué columnas se repiten?')).toBeInTheDocument();
    expect(getByText('¿Cómo quieres ordenarlos?')).toBeInTheDocument();
})