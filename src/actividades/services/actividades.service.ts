import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Actividad } from "../entities/actividad.entity";
import { Repository } from "typeorm";
import { ActividadDto } from "../dtos/actividad.dto";
import { PrioridadActividadEnum } from "../enums/prioridadActividad.enum";
import { EstadosActividadEnum } from "../enums/estadoActividad.enum";
import { NotFoundException } from '@nestjs/common';
import { FindOneOptions } from "typeorm";


@Injectable()
export class ActividadesService {

    constructor(@InjectRepository(Actividad) private actividadesRepo: Repository<Actividad>) {

    }

    async nuevaActividad(datosNuevaActividad: ActividadDto): Promise<Actividad> {
        const { descripcion, idUsuario, idUsuarioModificacion, fechaModificacion } = datosNuevaActividad

        // Crear nueva actividad
        const nuevaActividad = this.actividadesRepo.create({
            descripcion,
            idUsuario,
            idUsuarioModificacion,
            fechaModificacion,
            prioridad: PrioridadActividadEnum.MEDIA,
            estado: EstadosActividadEnum.PENDIENTE,            
        });

        // Guardar el nuevo usuario en la base de datos
        try {
            await this.actividadesRepo.save(nuevaActividad);
        } catch (error) {
            throw new BadRequestException('Error al registrar el usuario.');
        }

        return nuevaActividad
    }
    async actualizarActividad(id: number, actividadDto: ActividadDto): Promise<Actividad> {
        const actividadExistente = await this.obtenerActividadPorId(id);

        actividadExistente.descripcion = actividadDto.descripcion;
        actividadExistente.idUsuarioModificacion = actividadDto.idUsuarioModificacion;
        actividadExistente.fechaModificacion = actividadDto.fechaModificacion;

        try {
            await this.actividadesRepo.save(actividadExistente);
        } catch (error) {
            throw new BadRequestException('Error al actualizar la actividad.');
        }

        return actividadExistente;
    }

    async eliminarActividad(idActividad: number): Promise<string> {
        const actividadExistente = await this.actividadesRepo.findOne({ where: { idActividad } });
      
        if (!actividadExistente) {
          throw new NotFoundException('La actividad a eliminar no existe.');
        }
      
        await this.actividadesRepo.remove(actividadExistente);
      
        return `La actividad con ID ${idActividad} fue eliminada correctamente.`;
      }
      async obtenerActividadPorId(id: number): Promise<Actividad> {
        const opciones: FindOneOptions<Actividad> = { where: { idActividad: id } };
        return await this.actividadesRepo.findOneOrFail(opciones);
      }
}
