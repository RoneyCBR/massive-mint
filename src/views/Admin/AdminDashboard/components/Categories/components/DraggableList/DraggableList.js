import React from 'react';
import { DragDropContext, Droppable, OnDragEndResponder } from 'react-beautiful-dnd';
import PropTypes from 'prop-types';

const DraggableList = ({ initialRows }) => {
    const onDragEnd = () => {};
    return (
        <DragDropContext onDragEnd={OnDragEndResponder}>
            <Droppable droppabled="droppable-list">
                {provider => (
                    <div ref={provider.innerRef} {...provider.droppabledProps}>
                        {items.map((item, index)=>(
                            <DraggableListItem item={item} index={index} key={index} />
                        ))}
                    </div>
                )}
            </Droppable>
        </DragDropContext>
    );
};

DraggableList.propTypes = {
    initialRows: PropTypes.array
}

export default DraggableList;
