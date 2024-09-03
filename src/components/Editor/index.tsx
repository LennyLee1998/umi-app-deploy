import {
  DomEditor,
  IDomEditor,
  IEditorConfig,
  IToolbarConfig,
} from '@wangeditor/editor';
import { Editor, Toolbar } from '@wangeditor/editor-for-react';
import '@wangeditor/editor/dist/css/style.css'; // 引入 css
import { nanoid } from 'nanoid';
import React, { useEffect, useState } from 'react';

type InsertFnType = (url: string, alt: string, href: string) => void;
const MyEditor: React.FC = (props: any) => {
  // console.log(props);
  // editor 实例
  const [editor, setEditor] = useState<IDomEditor | null>(null); // TS 语法

  // 编辑器内容
  const [html, setHtml] = useState('<p>hello</p>');

  useEffect(() => {
    // 获取 toolbar 实例
    const toolbar = DomEditor?.getToolbar(editor as IDomEditor);
    const curToolbarConfig = toolbar?.getConfig() as IToolbarConfig;
    // if (curToolbarConfig && curToolbarConfig.excludeKeys) {
    //   curToolbarConfig.toolbarKeys = [
    //     // 菜单 key
    //     'headerSelect',

    //     // 分割线
    //     '|',

    //     // 菜单 key
    //     'bold',
    //     'fontSize',
    //     'italic',
    //     'underline',
    //     'indent',
    //     'lineHeight',
    //     'todo',

    //     // 菜单组，包含多个菜单
    //     {
    //       key: 'group-more-style', // 必填，要以 group 开头
    //       title: '更多样式', // 必填
    //       iconSvg: '<svg>....</svg>', // 可选
    //       menuKeys: ['through', 'code', 'clearStyle'], // 下级菜单 key ，必填
    //     },
    //     // 继续配置其他菜单...
    //   ];
    // }

    // if (curToolbarConfig && curToolbarConfig.excludeKeys) {
    //   curToolbarConfig.excludeKeys = [
    //     // 'headerSelect',
    //     'blockquote',
    //     'italic',
    //     'group-more-style', // 排除菜单组，写菜单组 key 的值即可
    //   ];
    // }
    // console.log(curToolbarConfig?.toolbarKeys);
  }, [editor]);

  // 模拟 ajax 请求，异步设置 html
  useEffect(() => {
    setTimeout(() => {
      setHtml('<p>hello world</p>');
    }, 1500);
  }, []);

  // 工具栏配置
  const toolbarConfig: Partial<IToolbarConfig> = {}; // TS 语法

  // 编辑器配置
  const editorConfig: Partial<IEditorConfig> = {
    placeholder: '请输入内容...',
  };

  editorConfig.onBlur = (editor: IDomEditor) => {
    // console.log(editor);
    props.onChange(editor.getHtml());
  };

  if (
    editorConfig &&
    editorConfig.MENU_CONF &&
    editorConfig.MENU_CONF['uploadImage']
  ) {
    editorConfig.MENU_CONF['uploadImage'] = {
      server: 'http://localhost:5000',
      // 自定义上传
      async customUpload(file: File, insertFn: InsertFnType) {
        // console.log(info);
        // setLoading(false);
        // setImageUrl(url);
        // onSetImgURL('imgUrl', url);

        // insertFn(url, '详情图片', url);
      },
    };
  }

  // 及时销毁 editor ，重要！
  useEffect(() => {
    return () => {
      if (editor == null) return;
      editor.destroy();
      setEditor(null);
    };
  }, [editor]);

  return (
    <>
      <div style={{ border: '1px solid #ccc', zIndex: 100 }}>
        <Toolbar
          editor={editor}
          defaultConfig={toolbarConfig}
          mode="default"
          style={{ borderBottom: '1px solid #ccc' }}
        />
        <Editor
          defaultConfig={editorConfig}
          value={html}
          onCreated={setEditor}
          onChange={(editor) => {
            setHtml(editor.getHtml());
          }}
          mode="default"
          style={{ height: '500px', overflowY: 'hidden' }}
        />
      </div>
      {/* <div style={{ marginTop: '15px' }}>{html}</div> */}
    </>
  );
};

export default MyEditor;
