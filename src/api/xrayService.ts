import axios from 'axios';

/**
 * Interface for X-ray analysis result from the backend
 */
interface XrayAnalysisResult {
  id: string;
  diagnosis: string;
  confidence: number;
  recommendations: string[];
  imageUrl?: string;
}

/**
 * Service class for X-ray-related API operations
 */
class XrayService {
  private apiBaseUrl: string;
  
  constructor() {
    // This would be an environment variable in a real application
    this.apiBaseUrl = process.env.API_URL || 'https://api.healthassist.com';
  }

  /**
   * Upload an X-ray image to the server and get the analysis result
   * 
   * @param file The X-ray image file to analyze
   * @param onProgress Optional callback to track upload progress
   * @returns Promise that resolves to the analysis result
   */
  async uploadAndAnalyzeXray(
    file: File,
    onProgress?: (progressPercent: number) => void
  ): Promise<XrayAnalysisResult> {
    try {
      // Create a FormData object to send the file
      const formData = new FormData();
      formData.append('xrayImage', file);
      
      // Set up the request with progress tracking
      const response = await axios.post(
        `${this.apiBaseUrl}/api/xray/analyze`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            // In a real app, you would include authentication headers
            // 'Authorization': `Bearer ${authToken}`
          },
          onUploadProgress: (progressEvent) => {
            if (onProgress && progressEvent.total) {
              const percentCompleted = Math.round(
                (progressEvent.loaded * 100) / progressEvent.total
              );
              onProgress(percentCompleted);
            }
          }
        }
      );
      
      return response.data;
    } catch (error) {
      console.error('Error uploading and analyzing X-ray:', error);
      throw error;
    }
  }

  /**
   * Get the user's X-ray upload history
   * 
   * @param userId The ID of the user
   * @returns Promise that resolves to an array of analysis results
   */
  async getUserXrayHistory(userId: string): Promise<XrayAnalysisResult[]> {
    try {
      const response = await axios.get(
        `${this.apiBaseUrl}/api/xray/history/${userId}`,
        {
          headers: {
            // In a real app, you would include authentication headers
            // 'Authorization': `Bearer ${authToken}`
          }
        }
      );
      
      return response.data;
    } catch (error) {
      console.error('Error fetching user X-ray history:', error);
      throw error;
    }
  }

  /**
   * Delete an X-ray image and its analysis from the server
   * 
   * @param xrayId The ID of the X-ray analysis to delete
   * @returns Promise that resolves when the deletion is complete
   */
  async deleteXrayAnalysis(xrayId: string): Promise<void> {
    try {
      await axios.delete(
        `${this.apiBaseUrl}/api/xray/${xrayId}`,
        {
          headers: {
            // In a real app, you would include authentication headers
            // 'Authorization': `Bearer ${authToken}`
          }
        }
      );
    } catch (error) {
      console.error('Error deleting X-ray analysis:', error);
      throw error;
    }
  }
}

// Export a singleton instance
export const xrayService = new XrayService(); 