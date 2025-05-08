// src/types/models/Menu.ts

import { LucideIcon } from 'lucide-react';

export interface SubMenuItem {
  label: string;
  href: string;
}

export interface MenuItem {
  icon: LucideIcon;
  label: string;
  href?: string;
  submenu?: SubMenuItem[];
}
