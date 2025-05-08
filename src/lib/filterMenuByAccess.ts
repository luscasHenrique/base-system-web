// src/lib/filterMenuByAccess.ts

import { MenuItem } from '@/types/models/Menu';
import { accessControl } from './accessControl';
import { UserRole } from '@/types/models/User';

function canAccess(path: string, role: UserRole): boolean {
  const allowedRoles = accessControl[path];
  if (!allowedRoles) return true;
  return allowedRoles.includes(role);
}

export function filterMenuByAccess(
  menu: MenuItem[],
  userRole: UserRole,
): MenuItem[] {
  return menu
    .map((item) => {
      if (item.href) {
        if (!canAccess(item.href, userRole)) return null;
        return item;
      }

      if (item.submenu) {
        const filteredSubmenu = item.submenu.filter((sub) =>
          canAccess(sub.href, userRole),
        );
        if (filteredSubmenu.length === 0) return null;

        return { ...item, submenu: filteredSubmenu };
      }

      return item;
    })
    .filter(Boolean) as MenuItem[];
}
