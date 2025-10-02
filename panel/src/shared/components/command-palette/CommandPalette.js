"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command"
import { useCommandPaletteStore } from "@/lib/store"
import {
  BarChart3,
  Box,
  Globe,
  Map,
  Settings,
  ShieldCheck,
  Users,
  FileText,
  Plus,
} from "lucide-react"

/**
 * CommandPalette - Global command palette for quick navigation and actions
 * Triggered by Cmd/Ctrl+K
 */
export function CommandPalette() {
  const router = useRouter()
  const { isOpen, close } = useCommandPaletteStore()
  const [search, setSearch] = useState("")

  useEffect(() => {
    const down = (e) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        useCommandPaletteStore.getState().toggle()
      }
    }

    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  const runCommand = (command) => {
    close()
    command()
  }

  // Navigation commands
  const navigationCommands = [
    {
      icon: BarChart3,
      label: "Dashboard",
      onSelect: () => router.push("/"),
    },
    {
      icon: Box,
      label: "Agents",
      onSelect: () => router.push("/agents"),
    },
    {
      icon: ShieldCheck,
      label: "Rules",
      onSelect: () => router.push("/rules"),
    },
    {
      icon: Map,
      label: "Routes",
      onSelect: () => router.push("/routes"),
    },
    {
      icon: Globe,
      label: "GeoDNS",
      onSelect: () => router.push("/geodns"),
    },
    {
      icon: Users,
      label: "Users",
      onSelect: () => router.push("/users"),
    },
    {
      icon: BarChart3,
      label: "Analytics",
      onSelect: () => router.push("/analytics"),
    },
    {
      icon: Settings,
      label: "Settings",
      onSelect: () => router.push("/settings"),
    },
    {
      icon: FileText,
      label: "Audit Logs",
      onSelect: () => router.push("/audit-logs"),
    },
  ]

  // Quick action commands
  const actionCommands = [
    {
      icon: Plus,
      label: "Create Agent",
      onSelect: () => router.push("/agents?action=create"),
    },
    {
      icon: Plus,
      label: "Create Rule",
      onSelect: () => router.push("/rules?action=create"),
    },
    {
      icon: Plus,
      label: "Create Route",
      onSelect: () => router.push("/routes?action=create"),
    },
    {
      icon: Plus,
      label: "Create DNS Record",
      onSelect: () => router.push("/geodns?action=create"),
    },
    {
      icon: Plus,
      label: "Create User",
      onSelect: () => router.push("/users?action=create"),
    },
  ]

  return (
    <CommandDialog open={isOpen} onOpenChange={close}>
      <CommandInput
        placeholder="Type a command or search..."
        value={search}
        onValueChange={setSearch}
      />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>

        <CommandGroup heading="Navigation">
          {navigationCommands.map((command) => {
            const Icon = command.icon
            return (
              <CommandItem
                key={command.label}
                onSelect={() => runCommand(command.onSelect)}
              >
                <Icon className="mr-2 h-4 w-4" />
                <span>{command.label}</span>
              </CommandItem>
            )
          })}
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Quick Actions">
          {actionCommands.map((command) => {
            const Icon = command.icon
            return (
              <CommandItem
                key={command.label}
                onSelect={() => runCommand(command.onSelect)}
              >
                <Icon className="mr-2 h-4 w-4" />
                <span>{command.label}</span>
              </CommandItem>
            )
          })}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  )
}
