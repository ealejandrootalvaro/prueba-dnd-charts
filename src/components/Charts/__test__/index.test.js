import React from 'react';
import { render } from '@testing-library/react';
import { rawData } from '../raw-data';
import Chart from '../index';

import { ReduxWrapper } from '../../../test-helper/test-utils';

it('should render', () => {
    //Test de renderizado
    render(<ReduxWrapper><Chart rawData={rawData} /></ReduxWrapper>);
    expect(true).toBeTruthy();
})