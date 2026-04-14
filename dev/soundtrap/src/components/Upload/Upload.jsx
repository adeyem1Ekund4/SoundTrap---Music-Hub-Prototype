import { useState } from 'react'
import { supabase } from '../../lib/supabase'

function Upload({ onUploadSuccess }) {
  const [selectedFile, setSelectedFile] = useState(null)
  const [uploading, setUploading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(null)

  function handleFileChange(e) {
    const file = e.target.files[0]
    if (!file) return
    setSelectedFile(file)
    setSuccess(false)
    setError(null)
  }

  async function handleUpload() {
    if (!selectedFile) return

    setUploading(true)
    setError(null)
    setSuccess(false)

    const filename = `${Date.now()}_${selectedFile.name}`

    const { error: storageError } = await supabase.storage
      .from('tracks')
      .upload(filename, selectedFile)

    if (storageError) {
      setError(storageError.message)
      setUploading(false)
      return
    }

    const { data: urlData } = supabase.storage
      .from('tracks')
      .getPublicUrl(filename)

    const fileUrl = urlData.publicUrl

    const { error: dbError } = await supabase
      .from('tracks')
      .insert({ title: selectedFile.name, file_url: fileUrl })

    if (dbError) {
      setError(dbError.message)
      setUploading(false)
      return
    }

    setUploading(false)
    setSuccess(true)
    setSelectedFile(null)
    if (onUploadSuccess) onUploadSuccess()
  }

  return (
    <div className="upload-card">
      <h2>Upload a Track</h2>
      <div className="upload-row">
        <label className="file-label">
          {selectedFile ? selectedFile.name : 'Choose .mp3 / .wav / .flac'}
          <input
            type="file"
            accept=".mp3,.wav,.flac"
            onChange={handleFileChange}
            disabled={uploading}
          />
        </label>
        <button onClick={handleUpload} disabled={!selectedFile || uploading}>
          {uploading ? 'Uploading...' : 'Upload'}
        </button>
      </div>
      {success && <p className="msg-success">Track uploaded successfully!</p>}
      {error && <p className="msg-error">Error: {error}</p>}
    </div>
  )
}

export default Upload
