import {Alert, FormGroup, InputLabel,Box} from "@mui/material";
import React, {useEffect, useRef, useState} from "react";
import UploadItem from "@/Components/UploadItem";

const Upload = ({
                    url,
                    label,
                    name,
                    value,
                    error,
                    helperText,
                    onChange,
                    multiple = false,
                    editable = true,
                    valueChanged,
                    accept,
                }) => {
    const inputRef = useRef();
    const [labelText, setLabelText] = React.useState("اینجا کلیک کنید یا فایل را بکشید و اینجا رها کنید ");
    const [isDragOver, setIsDragOver] = React.useState(false);
    const [isMouseOver, setIsMouseOver] = React.useState(false);

    const [progress, setProgress] = useState(multiple ? [] : 0);
    const [loading, setLoading] = useState(multiple ? [] : false);

    const [renderedList, setRenderedList] = useState(null);


    useEffect(() => {
        console.log(accept);
        if (!multiple)
            value ? setRenderedList(<UploadItem values={value} loading={loading} progress={progress}
                                              onDelete={handleDeleteFile()} editable
                                              valueChanged={valueChanged}/>) : null;
        else
            setRenderedList(value.map((item, index) => (
                <UploadItem key={index} value={item} onDelete={handleDeleteFile(index)} progress={progress[index]}
                            loading={loading[index]} editable={editable}/>
            )))
    }, [valueChanged])

    const stopDefaults = (e) => {
        e.stopPropagation()
        e.preventDefault()
    }
    const dragEvents = {
        onMouseEnter: () => {
            setIsMouseOver(true)
            setLabelText("برای بارگزاری فایل کلیک کنید یا فایل را بکشید و اینجا رها کند")
        },
        onMouseLeave: () => {
            setIsMouseOver(false)
            setLabelText("برای بارگزاری فایل کلیک کنید یا فایل را بکشید و اینجا رها کند")
        },
        onDragEnter: (e) => {
            stopDefaults(e)
            setIsDragOver(true)
            setLabelText("اینجا رها کند")
        },
        onDragLeave: (e) => {
            stopDefaults(e)
            setIsDragOver(false)
            setLabelText("برای بارگزاری فایل کلیک کنید یا فایل را بکشید و اینجا رها کند")
        },
        onDragOver: stopDefaults,
        onDrop: (e) => {
            stopDefaults(e)
            setLabelText("اینجا رها کند")
            setIsDragOver(false)
            if (e.dataTransfer.files.length) {
                if (multiple) {
                    [...e.dataTransfer.files].map(upload);
                    onChange({target: {name, value: [...value, ...e.dataTransfer.files]}});
                } else
                    onChange({target: {name, value: e.dataTransfer.files[0]}});
            }
        },
        onClick: (e) => {
            stopDefaults(e);
            inputRef.current.click();
        }
    }
    const handleFileChange = e => {
        if (multiple) {
            [...e.target.files].map(upload);
            onChange({target: {name, value: [...value, ...e.target.files]}})
        } else {
            upload(e.target.files[0], null);
            onChange({target: {name, value: e.target.files[0]}});
        }
    }
    const handleChange = (index) => (val) => {
        if (index != null) {
            let tmp = value;
            if (val) {
                tmp[index] = val;
            } else
                tmp.splice(index, 1);
            onChange({target: {name, value: tmp}})
        } else onChange({target: {name, value: val}})

    }
    const upload = (file, index) => {
        let formData = new FormData();
        let length = multiple ? value.length : null;
        formData.append("file", file);
        setLoading(prevState => {
            if (multiple) {
                let tmp = prevState;
                tmp[index + length] = true;
                return tmp;
            } else return true;
        });
        axios.post(url, formData, {
            onUploadProgress: e => setProgress(prevState => {
                if (multiple) {
                    let tmp = prevState;
                    tmp[index + length] = (e.loaded / e.total) * 100;
                    return tmp;
                } else
                    return (e.loaded / e.total) * 100
            })
        }).then(res => {
            handleChange(multiple ? index + length : null)(res.data.data);
            setLoading(prevState => {
                if (multiple) {
                    let tmp = prevState;
                    tmp[index + length] = false;
                    return tmp;
                } else return false
            });
        }).catch(e => handleChange(file?.index)(null));
    }

    const handleDeleteFile = (index) => () => {
        handleChange(index)(null);
    }

    return <FormGroup sx={{width: "100%", minWidth: "400px"}}>
        <InputLabel>{label}</InputLabel>


        {editable ? (
            <>
                <Box width={"100%"} {...dragEvents} sx={{
                    border: "solid 1px",
                    display: "flex",
                    alignItems: "center",
                    alignContent: "center",
                    justifyContent: "center",
                    justifyItems: "center",
                    minHeight: "100px"
                }}>
                    {!isMouseOver || !isDragOver ? <span> {labelText}</span> : null}
                </Box>
                <input ref={inputRef} hidden type={"file"} multiple={multiple} onChange={handleFileChange} accept={accept}/>
                {error && <Alert severity="error" >{helperText}</Alert>}
            </>
        ) : null}
        {renderedList}
    </FormGroup>

}

export default Upload;
