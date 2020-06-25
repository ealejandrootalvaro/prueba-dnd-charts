import slice, {setColumns, changeColumn, sortColumn, changeOrderFromColumn, resetInitialValues} from '../slice';

it('should set default values', () => {
    const newState = slice(undefined, {});
    expect(newState.orderColumns).toEqual([]);
    expect(newState.repeatedColumns).toEqual([]);
});

it('should set column values', () => {
    const columns = [ {  id: 1, text: 'Hello'}  ];
    const newState = slice({
        orderColumns: [],
        defaults: {}
    }, setColumns({name: 'orderColumns', columns}));
    expect(newState.orderColumns).toEqual(columns);
});

it('should select column', () => {
    const newState = slice({
        orderColumns: [
            {  id: 1, text: 'Hello'}
        ],
        defaults: {}
    }, changeColumn({name: 'orderColumns', column: { id: 1 }}));
    expect(newState.orderColumns[0].selected).toEqual(true);
});

it('should change column position', () => {
    const newState = slice({
        orderColumns: [
            { id: 1, text: 'Hello'},
            { id: 2, text: 'World' }
        ],
        defaults: {}
    }, sortColumn({name: 'orderColumns', oldIndex: 0, newIndex: 1}));
    expect(newState.orderColumns[0].id).toEqual(2);
})

it('should change column order prop', () => {
    const newState = slice({
        orderColumns: [
            { id: 1, text: 'Hello'},
            { id: 2, text: 'World' }
        ],
        defaults: {}
    }, changeOrderFromColumn({name: 'orderColumns', column: { id: 1 }, order: 'asc'}));
    expect(newState.orderColumns[0].order).toEqual('asc');
})

it('should restore initial values', () => {
    const newState = slice({
        orderColumns: [
            { id: 1, text: 'Hello'},
            { id: 2, text: 'World' }
        ],
        defaults: {
            orderColumns: [
                {id: 1, text: 'first'}
            ]
        }
    }, resetInitialValues());
    expect(newState.orderColumns[0].text).toEqual('first');
})

