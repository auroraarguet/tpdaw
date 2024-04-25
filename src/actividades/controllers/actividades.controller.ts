import { Body, Controller, Post,Put, Param, Delete } from "@nestjs/common";
import { ActividadDto } from "../dtos/actividad.dto";
import { ActividadesService } from "../services/actividades.service";


@Controller("actividades")
export class ActividadesController {

    constructor(private actividadesService: ActividadesService) {

    }

    @Post("/nueva")
    async postActividadNueva(@Body() nuevaActividad: ActividadDto) {
        return await this.actividadesService.nuevaActividad(nuevaActividad);
    }
    @Put("/:id")
    async actualizarActividad(@Param("id") id: number, @Body() actividadDto: ActividadDto): Promise<Actividad> {
        return await this.actividadesService.actualizarActividad(id, actividadDto);
    }

    @Delete("/:id")
async eliminarActividad(@Param("id") id: number): Promise<{ mensaje: string }> {
  const actividadId = id;
  const mensaje = await this.actividadesService.eliminarActividad(actividadId);
  return { mensaje };
}

}
