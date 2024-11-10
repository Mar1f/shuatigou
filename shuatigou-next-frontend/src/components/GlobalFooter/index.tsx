import React from "react";
import './index.css';
/**
 * 全局底部栏组件
 * @constructor
 */
export default function GlobalFooter() {
    const currentYear = new Date().getFullYear();
    return (
        <div className="global-footer">
            <div className="text-alt">© {currentYear} 刷题平台</div>
            <div>
                <a href="#" target="_blank">
                    Mar1f
                </a>
            </div>
        </div>
    );
}