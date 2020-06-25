import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import data from '../data';
import SelectColumns from '../SelectColumns';

import { ReduxWrapper } from '../../../test-helper/test-utils';

it('should render', () => {
    const { getByText } = render(<ReduxWrapper><SelectColumns initialColumns={data} title="Title test" listName="repeatedColumns" /></ReduxWrapper>);
    expect(getByText('Title test')).toBeInTheDocument();
});

it('should filter columns', () => {
    const { getByLabelText, queryAllByTestId } = render(<ReduxWrapper><SelectColumns initialColumns={data} title="Title test" listName="repeatedColumns" /></ReduxWrapper>);
    
    const input = getByLabelText('filter-columns');

    expect(queryAllByTestId('column-row')).toHaveLength(8);

    fireEvent.change(input, { target: { value: 'SKT_ID' } });
    
    expect(input.value).toBe('SKT_ID');
    expect(queryAllByTestId('column-row')).toHaveLength(1);
});