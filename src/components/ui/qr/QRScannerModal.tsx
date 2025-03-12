"use client"

import { Button } from "@/components/Button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/Dialog"
import { Html5Qrcode } from "html5-qrcode"
import { useRouter } from "next/navigation"
import { useEffect, useRef, useState } from "react"

interface QRScannerModalProps {
    isOpen: boolean
    onClose: () => void
}

export function QRScannerModal({ isOpen, onClose }: QRScannerModalProps) {
    const router = useRouter()
    const [error, setError] = useState<string | null>(null)
    const [scanning, setScanning] = useState(false)
    const [permissionGranted, setPermissionGranted] = useState(false)
    const [scannedUrl, setScannedUrl] = useState<string | null>(null)
    const scannerRef = useRef<Html5Qrcode | null>(null)
    const scannerContainerId = "qr-reader"

    // Initialize scanner when modal opens
    useEffect(() => {
        if (!isOpen) return

        // Check if camera permissions are granted
        navigator.mediaDevices.getUserMedia({ video: true })
            .then(() => {
                setPermissionGranted(true)
                setError(null)
            })
            .catch((err) => {
                console.error("Camera permission error:", err)
                setError("Camera permission denied. Please allow camera access to scan QR codes.")
                setPermissionGranted(false)
            })

        return () => {
            // Clean up scanner when modal closes
            if (scannerRef.current && scanning) {
                scannerRef.current.stop()
                    .catch(err => console.error("Error stopping scanner:", err))
            }
        }
    }, [isOpen])

    // Start scanning when permissions are granted
    useEffect(() => {
        if (!isOpen || !permissionGranted || scanning) return

        const startScanner = async () => {
            try {
                setScanning(true)

                // Initialize the scanner
                scannerRef.current = new Html5Qrcode(scannerContainerId)

                await scannerRef.current.start(
                    { facingMode: "environment" }, // Use back camera
                    {
                        fps: 10,
                        qrbox: { width: 250, height: 250 },
                    },
                    (decodedText) => {
                        // On successful scan
                        console.log("QR Code detected:", decodedText)
                        setScannedUrl(decodedText)

                        // Stop scanning after successful detection
                        if (scannerRef.current) {
                            scannerRef.current.stop()
                                .then(() => {
                                    setScanning(false)
                                })
                                .catch(err => {
                                    console.error("Error stopping scanner:", err)
                                })
                        }
                    },
                    (errorMessage) => {
                        // Ignore errors during scanning as they're usually just frames without QR codes
                        // console.error("QR Code scanning error:", errorMessage)
                    }
                )
            } catch (err) {
                console.error("Error starting scanner:", err)
                setError("Failed to start the QR scanner. Please try again.")
                setScanning(false)
            }
        }

        startScanner()
    }, [isOpen, permissionGranted, scanning])

    // Navigate to scanned URL
    const handleNavigate = () => {
        if (!scannedUrl) return

        // Check if URL is valid
        try {
            // If it's a relative URL, navigate directly
            if (scannedUrl.startsWith('/')) {
                router.push(scannedUrl)
                onClose()
                return
            }

            // For absolute URLs, check if they're valid
            const url = new URL(scannedUrl)

            // Open external URLs in a new tab
            if (url.origin !== window.location.origin) {
                window.open(scannedUrl, '_blank')
            } else {
                // Navigate to internal URLs
                router.push(url.pathname + url.search + url.hash)
            }

            onClose()
        } catch (err) {
            console.error("Invalid URL:", err)
            setError("Invalid URL detected. Please scan a valid QR code.")
        }
    }

    // Restart scanning
    const handleRescan = () => {
        setScannedUrl(null)
        setScanning(false)
        setError(null)
    }

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Scan QR Code</DialogTitle>
                </DialogHeader>

                <div className="flex flex-col items-center justify-center gap-4 py-4">
                    {error && (
                        <div className="bg-red-50 text-red-700 px-4 py-3 rounded-md text-sm mb-4 w-full">
                            {error}
                        </div>
                    )}

                    {!permissionGranted && !error && (
                        <div className="text-center py-8">
                            <p className="text-gray-600 mb-4">Camera permission is required to scan QR codes.</p>
                            <Button onClick={() => window.location.reload()}>
                                Grant Permission
                            </Button>
                        </div>
                    )}

                    {permissionGranted && !scannedUrl && (
                        <div className="w-full max-w-sm aspect-square bg-gray-100 rounded-lg overflow-hidden">
                            <div id={scannerContainerId} className="w-full h-full flex items-center justify-center">
                                {!scanning && <p className="text-gray-500">Initializing camera...</p>}
                            </div>
                        </div>
                    )}

                    {scannedUrl && (
                        <div className="w-full text-center">
                            <p className="font-medium mb-2">QR Code Detected</p>
                            <p className="text-sm text-gray-600 mb-4 break-all">{scannedUrl}</p>

                            <div className="flex gap-2 justify-center">
                                <Button variant="secondary" onClick={handleRescan}>
                                    Scan Again
                                </Button>
                                <Button onClick={handleNavigate}>
                                    Navigate to URL
                                </Button>
                            </div>
                        </div>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    )
} 