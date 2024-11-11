import { Editor } from "@bytemd/react";
import gfm from "@bytemd/plugin-gfm";
import highlight from "@bytemd/plugin-highlight";
import zhHans from "bytemd/locales/zh_Hans.json";
import theme from "bytemd-plugin-theme"
import { themeList } from "bytemd-plugin-theme"
import "bytemd/dist/index.css";
import "highlight.js/styles/vs.css";
import "./index.css";


interface Props {
    value?: string;
    onChange?: (v: string) => void;
    placeholder?: string;
}

const plugins = [gfm(), highlight(),theme({
    themeList,
})];

/**
 * Markdown 编辑器
 * @param props
 * @constructor
 */
const MdEditor = (props: Props) => {
    const { value = "", onChange, placeholder } = props;

    return (
        <div className="md-editor">
            <Editor
                locale={zhHans}
                value={value}
                placeholder={placeholder}
                mode="split"
                plugins={plugins}
                onChange={onChange}
            />
        </div>
    );
};

export default MdEditor;
