// utils/fileHandling.ts
export async function handleFileUpload(file: File): Promise<string | ArrayBuffer | null> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      
      reader.onload = (event) => {
        try {
          const binaryStr = event.target?.result;
          if (binaryStr !== undefined) {
            resolve(binaryStr);
          } else {
            reject(new Error('File reading result is undefined'));
          }
        } catch (error) {
          reject(error);
        }
      };
      
      reader.onerror = () => {
        reject(new Error('Error reading file'));
      };
      
      reader.readAsBinaryString(file);
    });
}