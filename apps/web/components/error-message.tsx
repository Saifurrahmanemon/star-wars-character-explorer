"use client"

import { Button } from "@/components/ui/button"
import { AlertTriangle, RefreshCw } from "lucide-react"
import { ApiError } from "@/lib/api"
import { Card, CardContent } from "./ui/card"

interface ErrorMessageProps {
  error: unknown
}

export function ErrorMessage({ error }: ErrorMessageProps) {
  const isApiError = error instanceof ApiError
  const message = isApiError ? error.message : "An unexpected error occurred"
  const status = isApiError ? error.status : 500


  return (
    <Card className="bg-red-900/20 border-red-800 max-w-md mx-auto">
      <CardContent className="pt-6 text-center">
        <AlertTriangle className="w-12 h-12 text-red-400 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-white mb-2">{status === 404 ? "Not Found" : "Error"}</h3>
        <p className="text-gray-300 mb-4">{message}</p>
        <Button
          variant="outline"
          onClick={() => window.location.reload()}
          className="border-red-600 text-red-400 hover:bg-red-900/30"
        >
          <RefreshCw className="w-4 h-4 mr-2" />
          Try Again
        </Button>
      </CardContent>
    </Card>
  )
}
