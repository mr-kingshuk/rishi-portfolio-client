import React from 'react';
import styles from './Media.module.css';

import ImageUpload from '../ImageUpload/ImageUpload.jsx';
import { uploadImage } from '../../utilities/uploadImage.js';
import { deleteImage } from '../../utilities/deleteImage.js';
import { encodeImageToBlurhash } from '../../utilities/blurhash.js';
import { fileType } from '../../utilities/fileType.js';

import { v4 as uuidv4 } from 'uuid';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const Media = ({ media, setMedia }) => {
  const isHero = false;

  const handleImage = async (e, setProgress) => {
    e.preventDefault();
    const file = e.target.files[0];
    console.log(file);
    if (!file) {
      return;
    }

    try {
      const type = file.type.split('/')[0];
      const ext = file.type.split('/')[1];
      let newMedia = { type: file.type };
      
      const downloadUrl = await uploadImage(file, setProgress, isHero);
      if (type === 'image' && ext !== 'gif') {
        const hash = await encodeImageToBlurhash(file);
        newMedia = { ...newMedia, hash: hash };
      }

      newMedia = { ...newMedia, url: downloadUrl, _id: uuidv4() };
      setMedia([...media, newMedia]); // Update your data state here
    }
    catch (error) {
      console.error(error.message);
    }
  };

  const handleDelete = async (imageURL, id) => {
    try {
      await deleteImage(imageURL);
      const newMedia = [...media];
      newMedia.splice(id, 1);
      setMedia(newMedia);
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleOnDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(media);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setMedia(items);
  };

  const getFileName = (imgURL) => {
    const pattern = /\/([^/?]+)\?/;
    const match = pattern.exec(imgURL);
    let filename = match ? match[1] : null;

    filename = filename.replace(/(%)(20)/g, " ");

    const regex = /^(.*?)_\d+\.(.*?)$/;
    const [, extractedFileName, extension] = filename.match(regex);
    const finalFileName = `${extractedFileName}.${extension}`;

    return finalFileName;
  };

  return (
    <div className={styles.outer}>
      <div className={styles.container}>
        <ImageUpload handleUpload={handleImage} isHero={isHero} type="Media Image/GIF" />
      </div>
      {media.length > 0 && (
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId='characters'>
            {(provided) => (
              <div className={styles.media_items} {...provided.droppableProps} ref={provided.innerRef}>
                {media.map((med, index) => {
                  const { type } = fileType(med.type);
                  return (
                    <Draggable key={med._id} draggableId={med._id} index={index}>
                      {(provided) => (
                        <div
                          className={styles.media}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          ref={provided.innerRef}
                        >
                          <div className={styles.icon}>
                            <img src={type === 'image' ? "/image.png" : "/video.png"} alt="type icon" />
                          </div>
                          <div className={styles.text}>{getFileName(med.url)}</div>
                          <div className={styles.delete} onClick={() => handleDelete(med.url, index)}>
                            <img src="/trash.png" alt="delete btn" />
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
    </div>
  );
};

export default Media;
