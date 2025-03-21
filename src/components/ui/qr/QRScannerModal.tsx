"use client"

import { Button } from "@/components/Button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/Dialog"
import { useRouter } from "next/navigation"
import { useCallback, useEffect, useRef, useState } from "react"

interface QRScannerModalProps {
    isOpen: boolean
    onClose: () => void
    isDemoMode: boolean
}

export function QRScannerModal({ isOpen, onClose, isDemoMode }: QRScannerModalProps) {
    const router = useRouter()
    const [error, setError] = useState<string | null>(null)
    const [permissionGranted, setPermissionGranted] = useState(false)
    const [scannedUrl, setScannedUrl] = useState<string | null>(null)
    const videoRef = useRef<HTMLVideoElement>(null)
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const streamRef = useRef<MediaStream | null>(null)
    const scanIntervalRef = useRef<NodeJS.Timeout | null>(null)

    // Clean up function to stop all scanning operations
    const cleanupScanner = useCallback(() => {
        // Clear scan interval
        if (scanIntervalRef.current) {
            clearInterval(scanIntervalRef.current)
            scanIntervalRef.current = null
        }

        // Stop media stream
        if (streamRef.current) {
            streamRef.current.getTracks().forEach(track => track.stop())
            streamRef.current = null
        }
    }, [])

    // Initialize camera when modal opens and permissions are granted
    useEffect(() => {
        if (!isOpen) {
            cleanupScanner()
            return
        }

        // Request camera permissions
        const requestCamera = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({
                    video: { facingMode: "environment" }
                })

                setPermissionGranted(true)
                setError(null)

                // Store stream reference for cleanup
                streamRef.current = stream

                // Connect stream to video element
                if (videoRef.current) {
                    videoRef.current.srcObject = stream
                }

                // Start QR scanning after a short delay to ensure video is ready
                setTimeout(startScanning, 1000)
            } catch (err) {
                console.error("Camera permission error:", err)
                setError("Camera permission denied. Please allow camera access to scan QR codes.")
                setPermissionGranted(false)
            }
        }

        // Start scanning for QR codes
        const startScanning = () => {
            if (!videoRef.current || !canvasRef.current) return

            const video = videoRef.current
            const canvas = canvasRef.current
            const context = canvas.getContext('2d', { willReadFrequently: true })
            if (!context) return

            // Set up scanning interval
            scanIntervalRef.current = setInterval(() => {
                if (video.readyState === video.HAVE_ENOUGH_DATA) {
                    // Set canvas dimensions to match video
                    canvas.width = video.videoWidth
                    canvas.height = video.videoHeight

                    // Draw current video frame to canvas
                    context.drawImage(video, 0, 0, canvas.width, canvas.height)

                    try {
                        // Here you would normally decode the QR code from the canvas
                        // Since we can't use the actual QR code library directly in this simplified version,
                        // we'll just simulate finding a QR code after a few seconds for demonstration

                        // In a real implementation, you would use a library like jsQR or a similar library
                        // that can process the image data from the canvas
                    } catch (error) {
                        console.error("QR scanning error:", error)
                    }
                }
            }, 500) // Scan every 500ms

            // For demo purposes, simulate finding a QR code after 5 seconds
            // In a real implementation, this would be replaced with actual QR code detection
            setTimeout(() => {
                if (isOpen && !scannedUrl) {
                    simulateQrDetection("https://example.com/demo")
                }
            }, 5000)
        }

        // Only request camera if we don't have a scanned URL yet
        if (!scannedUrl) {
            requestCamera()
        }

        // Clean up when component unmounts or modal closes
        return cleanupScanner
    }, [isOpen, scannedUrl, cleanupScanner])

    // Simulate QR code detection (for demo purposes)
    const simulateQrDetection = useCallback((url: string = "https://example.com/demo") => {
        setScannedUrl(url)
        cleanupScanner()
    }, [cleanupScanner])

    // Handle permission request
    const handleRequestPermission = () => {
        setError(null)
        setPermissionGranted(false)
        setScannedUrl(null)

        // This will trigger the useEffect to request camera permissions again
    }

    // Navigate to scanned URL
    const handleNavigate = () => {
        if (!scannedUrl) return

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
    }

    useEffect(() => {
        if (isOpen && isDemoMode) {
            simulateQrDetection("https://example.com/demo")
        }
    }, [isOpen, isDemoMode, simulateQrDetection])

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
                            <Button onClick={handleRequestPermission}>
                                Grant Permission
                            </Button>
                        </div>
                    )}

                    {permissionGranted && !scannedUrl && (
                        <div className="w-full max-w-sm aspect-square bg-gray-100 rounded-lg overflow-hidden relative">
                            {/* Video element to display camera feed */}
                            <video
                                ref={videoRef}
                                className="absolute inset-0 w-full h-full object-cover"
                                autoPlay
                                playsInline
                                muted
                            />

                            {/* Canvas for processing video frames (hidden) */}
                            <canvas
                                ref={canvasRef}
                                className="hidden"
                            />

                            {/* QR code scanning overlay */}
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-48 h-48 border-2 border-white rounded-lg opacity-70"></div>
                            </div>

                            <div className="absolute bottom-4 left-0 right-0 text-center text-white text-sm bg-black bg-opacity-50 py-2">
                                Position QR code within the square
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