import React from 'react';
import { Layout} from 'antd';
import Menu from './Menu';
import ErrorBoundary from '../error';

const { Header, Content, Footer, Sider } = Layout;

export default class layout extends React.Component {
  render(){
    return(
      <Layout>
        <Sider
          breakpoint="lg"
          collapsedWidth="0"
          onBreakpoint={(broken) => { console.log(broken); }}
          onCollapse={(collapsed, type) => { console.log(collapsed, type); }}
        >
          <div className="logo" />
          <Menu />
        </Sider>
        <Layout>
          <Header style={{ background: '#001529', padding: 0 }} />
          <Content style={{ margin: '24px 16px 0' }}>
            <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
              <ErrorBoundary>
                {this.props.children}
              </ErrorBoundary>
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            ©2018 Created by Xiaohesong, All Rights Reserved.
          </Footer>
        </Layout>
      </Layout>
    )
  }
}

// export default layout