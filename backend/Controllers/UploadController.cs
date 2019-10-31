
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace upload_dotnet.Controllers {
    
    // [Route ("api/[controller]")]
    // [ApiController]
    public class UploadController : ControllerBase {

        public string Upload (IFormFile arquivo, string savingFolder) {
            IFormFile file = Request.Form.Files[0];
                
            if(savingFolder == null) {
                savingFolder = Path.Combine ("imgUpdated");                
            }

            var pathToSave = Path.Combine (Directory.GetCurrentDirectory (), savingFolder);

            if (file.Length > 0) {
                var fileName = ContentDispositionHeaderValue.Parse (file.ContentDisposition).FileName.Trim ('"');
                var fullPath = Path.Combine (pathToSave, fileName);
                var dbPath = Path.Combine (savingFolder, fileName);

                using (var stream = new FileStream (fullPath, FileMode.Create)) {
                    file.CopyTo (stream);
                }                    

                return dbPath;
            } else {
                return null;
            }
                
            
        }
    }

    //  atribuição
    // produto.ImagemProduto = UploadController.Upload(file, "img");
    //  await _contexto.AddAsync(produto);
    // Salvamos efetivamente o nosso objeto no banco de dados
    // await _contexto.SaveChangesAsync();

}