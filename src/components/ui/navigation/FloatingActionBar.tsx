"use client"

import { CreatePopover } from "../create/CreatePopover"

export function FloatingActionBar() {
    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4">
            <div className="flex flex-col items-end gap-2">
                <CreatePopover />
            </div>
        </div>
    )
} 