```javascript
/**
 * JADDY STUDIO - ROEX TONN API CONNECTOR
 * Este archivo conecta directamente con el analizador de voces profesional.
 */

const JaddyAPI = {
    config: {
        // Tu llave de RoEx Tonn API
        roexKey: "AIzaSyCrwU3NTViFTwJ-t6BMURPS8X2y__FJ4Qc", 
        roexBaseUrl: "https://api.roex.io/v1/analyze" 
    },

    /**
     * Analiza el audio y devuelve las frecuencias exactas para la mezcla.
     */
    async analyzeAudio(file) {
        console.log("Jaddy Studio: Enviando audio a RoEx...");
        
        const formData = new FormData();
        formData.append('file', file);
        formData.append('output_format', 'json');

        try {
            const response = await fetch(this.config.roexBaseUrl, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${this.config.roexKey}`
                    // Nota: No poner Content-Type manual, el navegador lo hace con FormData
                },
                body: formData
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error("Error RoEx:", errorData);
                throw new Error('Fallo en el servidor de análisis');
            }

            const data = await response.json();
            
            // Extraemos los datos técnicos que RoEx nos da
            // Ajustamos según la estructura real de la API Tonn
            return {
                muddy_freq: data.results?.tonal_balance?.muddy_area || 400,
                sibilance_freq: data.results?.tonal_balance?.sibilance_peak || 7500,
                clarity_score: data.results?.clarity || 0.5
            };

        } catch (error) {
            console.error("Error crítico en conexión:", error);
            // Si el internet del celular falla, devolvemos un estándar para que la App no muera
            return { muddy_freq: 415, sibilance_freq: 7800 };
        }
    }
};

// Lo dejamos en el objeto window para que analisis.html lo vea sin importar el navegador
window.JaddyAPI = JaddyAPI;

```
