'use client';

import { Button, Dropdown, Space, Typography } from 'antd';
import { 
  SunOutlined, 
  MoonOutlined, 
  UserOutlined, 
  LogoutOutlined,
  DashboardOutlined,
  HomeOutlined
} from '@ant-design/icons';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useTheme } from '@/providers/ThemeProvider';
import { useAuth } from '@/hooks/useAuth';
import { useLogoutMutation } from '@/hooks/mutations/useLoginMutation';
import styles from '@/styles/components/Header.module.css';

const { Text } = Typography;

export default function Header() {
  const { themeMode, toggleTheme } = useTheme();
  const { user, isAuthenticated } = useAuth();
  const logoutMutation = useLogoutMutation();
  const pathname = usePathname();

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  const userMenuItems = isAuthenticated ? [
    {
      key: 'admin',
      label: (
        <Link href="/admin">
          <Space>
            <DashboardOutlined />
            Dashboard
          </Space>
        </Link>
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
          Cerrar Sesión
        </Space>
      ),
      onClick: handleLogout,
    },
  ] : [
    {
      key: 'login',
      label: (
        <Link href="/login">
          <Space>
            <UserOutlined />
            Iniciar Sesión
          </Space>
        </Link>
      ),
    },
  ];

  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
        <Link href="/" className={styles.logo}>
          Mi Blog Personal
        </Link>

        <nav className={styles.nav}>
          <Link 
            href="/" 
            className={`${styles.navLink} ${pathname === '/' ? styles.active : ''}`}
          >
            <Space>
              <HomeOutlined />
              Inicio
            </Space>
          </Link>
          
          {isAuthenticated && (
            <Link 
              href="/admin" 
              className={`${styles.navLink} ${pathname.startsWith('/admin') ? styles.active : ''}`}
            >
              <Space>
                <DashboardOutlined />
                Admin
              </Space>
            </Link>
          )}
        </nav>

        <div className={styles.actions}>
          <Button
            type="text"
            icon={themeMode === 'light' ? <MoonOutlined /> : <SunOutlined />}
            onClick={toggleTheme}
            className={styles.themeToggle}
          />

          {isAuthenticated ? (
            <Dropdown menu={{ items: userMenuItems }} placement="bottomRight">
              <div className={styles.userMenu}>
                <div className={styles.userAvatar}>
                  {user?.email?.charAt(0).toUpperCase()}
                </div>
                <Text strong>{user?.email}</Text>
              </div>
            </Dropdown>
          ) : (
            <Link href="/login">
              <Button type="primary" icon={<UserOutlined />}>
                Iniciar Sesión
              </Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}