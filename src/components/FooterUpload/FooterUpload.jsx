import React, { useState } from 'react';
import styles from './FooterUpload.module.css';

const FooterUpload = ({ footer, setFooter }) => {
    const [name, setName] = useState("");
    const [hyperlink, setHyperlink] = useState({
        text: "",
        url: ""
    });
    const [message, setMessage] = useState(null)

    const handleDel = (index) => {
        const updatedFooter = {
            ...footer,
            guidedBy: [...footer.guidedBy.slice(0, index), ...footer.guidedBy.slice(index + 1)],
        };
        setFooter(updatedFooter);
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            const newGuidedBy = [...footer.guidedBy, name];
            console.log(newGuidedBy);
            setFooter({ ...footer, guidedBy: newGuidedBy });
            setName("");
        }
    };

    const addHyperlink = () => {
        if (hyperlink.text.length == 0 || hyperlink.url.length == 0) {
            setMessage("Plaese Enter both url and text")
            return;
        }
        const newHyperlinks = [...footer.hyperlinks, hyperlink];
        setFooter({ ...footer, hyperlinks: newHyperlinks });
        setHyperlink({
            text: "",
            url: ""
        });
    };

    const handleDelHyperlink = (index) => {
        const updatedFooter = {
            ...footer,
            hyperlinks: [...footer.hyperlinks.slice(0, index), ...footer.hyperlinks.slice(index + 1)],
        };
        setFooter(updatedFooter);
    };

    return (
        <div className={styles.outer}>
            <h3>Footer Details</h3>
            <div className={`${styles.input} ${styles.name_input}`}>
                <input
                    type="text"
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    name="name"
                    id="name"
                    className={`${styles.text_box}`}
                    onKeyDown={handleKeyPress}
                />
                <label htmlFor="name" className={styles.header}>Guided By</label>
            </div>
            <div className={styles.names}>
                {footer.guidedBy && footer.guidedBy.map((guides, index) =>
                    <div key={index} className={styles.name_tab} onClick={() => handleDel(index)}>
                        {guides}
                    </div>)}
            </div>
            <div className={styles.input}>
                <input
                    type="text"
                    onChange={(e) => setFooter({ ...footer, thanks: e.target.value })}
                    value={footer.thanks}
                    name="thanks"
                    id="thanks"
                    className={styles.text_box}
                />
                <label htmlFor="thanks" className={styles.header}>Special Thanks</label>
            </div>
            <h4>Hyperlinks</h4>
            {message && <div className={styles.error}>{message}</div>}
            <div className={styles.input}>
                <input
                    type="text"
                    onChange={(e) => setHyperlink({ ...hyperlink, url: e.target.value })}
                    value={hyperlink.url}
                    name="hyperlink_url"
                    id="hyperlink_url"
                    className={styles.text_box}
                />
                <label htmlFor="hyperlink_url" className={styles.header}>HyperLink URL</label>
            </div>
            <div className={`${styles.input} ${styles.name_input}`}>
                <input
                    type="text"
                    onChange={(e) => setHyperlink({ ...hyperlink, text: e.target.value })}
                    value={hyperlink.text}
                    name="hyperlink_text"
                    id="hyperlink_text"
                    className={styles.text_box}
                />
                <label htmlFor="hyperlink_text" className={styles.header}>HyperLink Text</label>
            </div>
            <div className={styles.btn} onClick={addHyperlink}>Add Hyperlink</div>
            <div className={styles.hyperlinkList}>
                {footer.hyperlinks && footer.hyperlinks.map((link, index) =>
                    <div key={index} className={styles.link}>
                        <div className={styles.urltext}>{link.text}</div>
                        <div 
                            className={styles.deleteIcon} 
                            onClick={() => handleDelHyperlink(index)}
                        >
                            <img src="/trash.png" alt="delete button"/> 
                        </div> 
                    </div>
                )}
            </div>
        </div>
    )
};

export default FooterUpload;