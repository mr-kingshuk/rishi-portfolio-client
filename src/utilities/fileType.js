export const fileType = (entireType) => {
    const type = entireType.split('/')[0];
    const ext = entireType.split('/')[1];

    return { type, ext }; 
}