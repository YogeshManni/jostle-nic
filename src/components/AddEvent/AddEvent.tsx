import React, {
  forwardRef,
  Component,
  useEffect,
  useRef,
  useState,
  useImperativeHandle,
} from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./AddEvent.css";
import moment from "moment";
import { getUser } from "../../helpers/helper";
const AddEvent = forwardRef(({ getAddEvent, newPost, postData }: any, ref) => {
  const [content, setContent] = useState("");
  const editorRef = useRef<any>("");
  const editorContentRef = useRef<any>("");
  const modules = {
    toolbar: [
      ["bold", "italic", "underline", "strike"], // toggled buttons
      ["blockquote", "code-block"],
      [{ header: 1 }, { header: 2 }], // custom button values
      [{ list: "ordered" }, { list: "bullet" }],
      [{ script: "sub" }, { script: "super" }], // superscript/subscript
      [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
      [{ direction: "rtl" }], // text direction
      [{ size: ["small", false, "large", "huge"] }], // custom dropdown
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [{ color: [] }, { background: [] }], // dropdown with defaults from theme
      [{ font: [] }],
      [{ align: [] }],
      ["link"],
      ["image"],
      ["clean"],
    ],
  };

  // react hook to call a method in child component from parent one
  useImperativeHandle(ref, () => ({
    addEvent() {
      const editorContent = editorContentRef.current.value;
      const imgData = editorContent;
      let rex = new RegExp('srcs*=s*"(.+?)"');
      let frontImage: any = rex.exec(editorContent);
      const data = {
        frontText: editorContent.replace(/<\/?[^>]+(>|$)/g, ""),
        img: (frontImage && frontImage[1]) || null,
        avtSrc: "",
        userName: getUser().username,
        content: editorContent,
        date: moment().format("LLL"),
      };
      getAddEvent(data);
    },
  }));

  const [editorHeight, setEditorHeight] = useState(10);

  useEffect(() => {
    console.log(postData);
    let parentHeight = editorRef.current.parentElement.clientHeight;
    if (window.innerWidth < 500) parentHeight -= 60;
    setEditorHeight(parentHeight);

    setContent(!newPost && postData.content);

    return () => {
      // console.log("unmounted!!");
    };
    // editorContentRef.current.value = postData;
  }, []);

  return (
    <>
      {/*  {newPost ? ( */}
      <div ref={editorRef}>
        <ReactQuill
          theme="snow"
          ref={editorContentRef}
          style={{ height: editorHeight - 50 }}
          value={content}
          modules={modules}
          readOnly={getUser().username === postData.username ? false : true}
        />
      </div>
      {/*  ) : (
        <div
          className="viewEventContainer"
          ref={editorRef}
          style={{ height: editorHeight - 50 }}
          dangerouslySetInnerHTML={{ __html: editorContentRef.current.value }}
        ></div>
       )} */}
    </>
  );
});

export default AddEvent;
