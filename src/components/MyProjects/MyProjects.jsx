import React, { useState } from 'react';
import styles from './MyProjects.module.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import DeleteModal from '../DeleteModal/DeleteModal.jsx';

import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const MyProjects = ({ token, headers, setHeaders }) => {
    const navigate = useNavigate();
    const [deleteModal, setDeleteModal] = useState({
        _id: null,
        index: null,
        value: false
    });
    const [button, setButton] = useState(true);
    const [message, setMessage] = useState(null);

    const handleUpdate = (id) => {
        navigate(`/update-project/${id}`);
    };

    const handleDelete = (id, index) => {
        setDeleteModal({
            _id: id,
            index,
            value: true
        });
    };

    const handleSaveOrder = async () => {
        try {
            const authorization = "Bearer " + token;
            setButton(true);
            const response = await axios.put(`https://rishis-server-8l672.ondigitalocean.app/api/project/reorder`, {
                project: headers
            },
                {
                    headers: {
                        "Authorization": authorization, // Set authorization header with token
                    },
                });
            setMessage(response.data.message);
        } catch (err) {
            console.log(err.message);
        }
    };

    const handleOnDragEnd = (result) => {
        if (!result.destination) return;
        setButton(false);
        setMessage(null);
        const items = Array.from(headers);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);

        setHeaders(items);
    };

    return (
        <div className={styles.outer}>
            <h3>Your Projects</h3>
            <div className={styles.header}>
                <div className={styles.item1}>Sr.No.</div>
                <div className={styles.item2}>Project Name</div>
                <div className={styles.item3}>Actions</div>
            </div>
            <hr />
            {headers.length > 0 && (
                <DragDropContext onDragEnd={handleOnDragEnd}>
                    <Droppable droppableId='characters'>
                        {(provided) => (
                            <div
                                className={styles.media_items}
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                            >
                                {headers.map((header, index) => {
                                    return (
                                        <Draggable key={header._id} draggableId={header._id} index={index}>
                                            {(provided) => (
                                                <div
                                                    className={styles.row}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                    ref={provided.innerRef}
                                                >
                                                    <div className={styles.item1}>{index + 1}</div>
                                                    <div className={styles.item2}>{header.heading}</div>
                                                    <div className={styles.item3}>
                                                        <div onClick={() => handleUpdate(header._id)}>
                                                            <img src="/update.png" alt="" />
                                                        </div>
                                                        <div onClick={() => handleDelete(header._id, index)}>
                                                            <img src="/trash.png" alt="" />
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </Draggable>
                                    )
                                })}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </DragDropContext>
            )}
            <div className={styles.btn_div}>
                <button
                    onClick={handleSaveOrder}
                    disabled={button}
                    className={`${styles.btn} ${!button ? styles.active : null}`}
                >Save Order</button>
                {message && <div className={styles.message}>{message}</div>}
            </div>

            {deleteModal.value && <DeleteModal setDeleteModal={setDeleteModal} deleteModal={deleteModal} headers={headers} setHeaders={setHeaders} token={token} />}
        </div>
    )
};

export default MyProjects;