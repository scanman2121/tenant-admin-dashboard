import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { useEffect, useState } from "react"

interface FullScreenSearchProps {
    isOpen: boolean
    onClose: () => void
}

export function FullScreenSearch({ isOpen, onClose }: FullScreenSearchProps) {
    const [searchQuery, setSearchQuery] = useState("")

    useEffect(() => {
        if (isOpen) {
            setSearchQuery("")
        }
    }, [isOpen])

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DialogContent className="sm:max-w-[600px]">
                <div className="flex items-center gap-2 border-b pb-4">
                    <Search className="h-5 w-5 text-gray-500" />
                    <Input
                        type="text"
                        placeholder="Search by keyword"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="border-0 p-0 text-lg focus-visible:ring-0"
                        autoFocus
                    />
                </div>

                <div className="mt-4">
                    {searchQuery ? (
                        <div className="space-y-4">
                            {/* Search results will be implemented here */}
                            <p className="text-sm text-gray-500">No results found for "{searchQuery}"</p>
                        </div>
                    ) : (
                        <div className="text-center text-sm text-gray-500">
                            Start typing to search
                        </div>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    )
} 