import React, { useEffect, useState, Fragment, useCallback } from 'react';
import { Layout, Menu, Breadcrumb, Icon, Skeleton } from 'antd';
import ContactMeForm from './ContactMeForm.js'
import CategoryForm from '../Editorial/CategoryForm.js';
const { Header, Content, Footer, Sider } = Layout;



const Imprenta  = () => {

    return (
        <Layout>
            <Content>
        <Layout style={{ padding: '24px 0', background: '#fff' }}>

<ContactMeForm />
</Layout>

</Content>

        </Layout>
        );
}

export default Imprenta;
