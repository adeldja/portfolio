import type { SimpleIcon } from "simple-icons";
import type { IconType } from "react-icons";
import {
  siReact,
  siVuedotjs,
  siNextdotjs,
  siDotnet,
  siLaravel,
  siNodedotjs,
  siTerraform,
  siGit,
  siDocker,
  siDart,
  siFlutter,
  siApple,
  siAndroid,
} from "simple-icons";
import { TbDatabase, TbInfinity } from "react-icons/tb";

export type SkillIcon =
  | { kind: "brand"; icon: SimpleIcon }
  | { kind: "generic"; Icon: IconType };

export interface SkillItem {
  name: string;
  href: string;
  icon: SkillIcon;
}

export interface SkillCategory {
  label: string;
  items: SkillItem[];
}

export const skillCategories: SkillCategory[] = [
  {
    label: "Frontend",
    items: [
      { name: "React", href: "https://react.dev", icon: { kind: "brand", icon: siReact } },
      {
        name: "React Native",
        href: "https://reactnative.dev",
        icon: { kind: "brand", icon: siReact },
      },
      { name: "Vue.js", href: "https://vuejs.org", icon: { kind: "brand", icon: siVuedotjs } },
      {
        name: "Next.js",
        href: "https://nextjs.org",
        icon: { kind: "brand", icon: siNextdotjs },
      },
    ],
  },
  {
    label: "Backend",
    items: [
      {
        name: "ASP.NET Core (.NET)",
        href: "https://dotnet.microsoft.com/apps/aspnet",
        icon: { kind: "brand", icon: siDotnet },
      },
      { name: "Laravel", href: "https://laravel.com", icon: { kind: "brand", icon: siLaravel } },
      {
        name: "Node.js",
        href: "https://nodejs.org",
        icon: { kind: "brand", icon: siNodedotjs },
      },
      {
        name: "Azure SQL Server",
        href: "https://azure.microsoft.com/products/azure-sql/database",
        icon: { kind: "generic", Icon: TbDatabase },
      },
    ],
  },
  {
    label: "DevOps",
    items: [
      {
        name: "Terraform",
        href: "https://www.terraform.io",
        icon: { kind: "brand", icon: siTerraform },
      },
      {
        name: "Azure DevOps",
        href: "https://azure.microsoft.com/products/devops",
        icon: { kind: "generic", Icon: TbInfinity },
      },
      { name: "Git", href: "https://git-scm.com", icon: { kind: "brand", icon: siGit } },
      { name: "Docker", href: "https://www.docker.com", icon: { kind: "brand", icon: siDocker } },
    ],
  },
  {
    label: "Mobile",
    items: [
      { name: "Dart", href: "https://dart.dev", icon: { kind: "brand", icon: siDart } },
      {
        name: "Flutter",
        href: "https://flutter.dev",
        icon: { kind: "brand", icon: siFlutter },
      },
      {
        name: "iOS",
        href: "https://developer.apple.com/ios/",
        icon: { kind: "brand", icon: siApple },
      },
      {
        name: "Android",
        href: "https://developer.android.com",
        icon: { kind: "brand", icon: siAndroid },
      },
    ],
  },
];
