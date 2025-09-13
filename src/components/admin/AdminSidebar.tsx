'use client';

import { useState } from 'react';
import { Layout, Menu, Breadcrumb, Typography, Space, Button, Dropdown } from 'antd';
import {
  DashboardOutlined,
  FileTextOutlined,
  PlusOutlined,
  SettingOutlined,
  MenuOutlined,
  UserOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { useLogoutMutation } from '@/hooks/mutations/useLoginMutation';
import styles from '@/styles/components/Sidebar.module.css';

const { Sider, Content } = Layout;
const { Text } = Typography;

interface AdminSidebarProps {
  children: React.ReactNode;
}

export default function AdminSidebar({ children }: AdminSidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();
  const { user } = useAuth();
  const logoutMutation = useLogoutMutation();

  const menuItems = [
    {
      key: '/admin',
      icon: <DashboardOutlined />,
      label: <Link href="/admin">Dashboard</Link>,
    },
    {
      key: '/admin/posts',
      icon: <FileTextOutlined />,
      label: 'Posts',
      children: [
        {
          key: '/admin/posts',
          label: <Link href="/admin/posts">Ver todos</Link>,
        },
        {
          key: '/admin/posts/create',
          icon: <PlusOutlined />,
          label: <Link href="/admin/posts/create">Crear nuevo</Link>,
        },
      ],
    },
    {
      key: '/admin/settings',
      icon: <SettingOutlined />,
      label: 'Configuración',
    },
  ];

  const getBreadcrumbItems = () => {
    const pathSegments = pathname.split('/').filter(Boolean);
    const items = [
      {
        title: <Link href="/admin">Admin</Link>,
      },
    ];

    if (pathSegments.length > 1) {
      if (pathSegments[1] === 'posts') {
        items.push({
          title: <Link href="/admin/posts">Posts</Link>,
        });
        
        if (pathSegments[2] === 'create') {
          items.push({ title: <span>Crear nuevo</span> });
        } else if (pathSegments[2] === 'edit') {
          items.push({ title: <span>Editar</span> });
        }
      }
    }

    return items;
  };

  const userMenuItems = [
    {
      key: 'profile',
      label: (
        <Space>
          <UserOutlined />
          Perfil
        </Space>
      ),
    },
    {
      type: 'divider' as const,
    },
    {
      key: 'logout',
      label: (
        <Space>
          <LogoutOutlined />
          Cerrar sesión
        </Space>
      ),
      onClick: () => logoutMutation.mutate(),
    },
  ];

  return (
    <Layout className={styles.adminLayout}>
      <Sider
        theme="dark"
        width={200}
        collapsible
        collapsed={collapsed}
        onCollapse={setCollapsed}
        className={styles.sider}
      >
        <div className={styles.logo}>
          {collapsed ? 'B' : 'Blog Admin'}
        </div>
        
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[pathname]}
          defaultOpenKeys={['/admin/posts']}
          items={menuItems}
        />
      </Sider>

      <Layout className={styles.content}>
        <div className={styles.contentHeader}>
          <div>
            <Breadcrumb
              items={getBreadcrumbItems()}
              className={styles.breadcrumbContainer}
            />
          </div>
          
          <div className={styles.userInfo}>
            <Text strong>{user?.email}</Text>
            <Dropdown menu={{ items: userMenuItems }} placement="bottomRight">
              <div className={styles.userAvatar}>
                {user?.email?.charAt(0).toUpperCase()}
              </div>
            </Dropdown>
          </div>
        </div>

        <div style={{ padding: '0 24px' }}>
          {children}
        </div>
      </Layout>

      {/* Mobile menu button */}
      <Button
        className={styles.mobileMenuButton}
        icon={<MenuOutlined />}
        onClick={() => setCollapsed(!collapsed)}
        style={{ display: 'none' }}
      />
    </Layout>
  );
}