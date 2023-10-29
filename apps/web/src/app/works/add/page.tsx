'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useFieldArray, useForm } from 'react-hook-form';
import * as z from 'zod';

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import axios from 'axios';
import { Modal } from '@/components/Modal';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useState } from 'react';

const addWorkFormSchema = z.object({
  ra: z
    .string({
      required_error: 'Digite o RA da placa.',
    })
    .min(2),
  pictures: z.any(),
  status: z.string(),
  code: z.string(),
  direction: z.string(),
  kilometer_position: z.string(),
  measurements: z.array(
    z.object({
      color: z.string(),
      measures: z.array(z.string()).max(5),
      average: z.string().optional(),
      minimum_value: z.string(),
      film_type: z.string(),
    }),
  ),
});

type AddWorkValues = z.infer<typeof addWorkFormSchema>;

// This can come from your database or API.
const defaultValues: Partial<AddWorkValues> = {};

export default function AddWork() {
  const form = useForm<AddWorkValues>({
    resolver: zodResolver(addWorkFormSchema),
    defaultValues,
    mode: 'onChange',
  });

  async function onSubmit(data: AddWorkValues) {
    const body = {
      author_name: 'Equipe 04', // Passado diretamente
      device_coord: ['10.1234', '20.5678'], // Passado diretamente
      pictures: [
        'https://cdn.autopapo.com.br/box/uploads/2018/08/29144427/shutterstock_520257244.jpg',
      ],
      status: data.status,
      work_type: 'MONITORING', // Passado diretamente
      code: data.code,
      direction: data.direction,
      kilometer_position: data.kilometer_position,
      measurements: data.measurements.map((measure) => {
        console.log(measure);
        return {
          color: measure.color,
          film_type: measure.film_type,
          measures: measure.measures.map((measure) => Number(measure)),
          minimum_value: Number(measure.minimum_value),
        };
      }),
    };
    console.log('here', body);
    try {
      await axios.post(`http://localhost:3001/sign/${data.ra}`, body, {
        headers: { 'x-api-key': '12345' },
      });
      setModalOpen(true);
    } catch (error) {
      console.error(error);
    }
  }

  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const { fields, append } = useFieldArray({
    name: 'measurements',
    control: form.control,
  });
  return (
    <Form {...form}>
      <h1 className="font-bold text-2xl uppercase my-4">Reportar placa</h1>
      <Dialog open={modalOpen}>
        <DialogContent className="w-5/6 rounded-md">
          <DialogHeader className="my-6 gap-4">
            <DialogTitle>Placa reportada</DialogTitle>
            <DialogDescription>Obrigado! Sua placa foi reportada com sucesso! ✅</DialogDescription>
            <Button onClick={() => setModalOpen(false)}>Continuar</Button>
          </DialogHeader>
        </DialogContent>
      </Dialog>

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="ra"
          key={`field.ra`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>RA da Placa</FormLabel>
              <FormControl>
                <Input placeholder="Ex: 1231231" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="status"
          key={'field.status'}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Status</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Estado da placa" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="GOOD">Normal / Boa refletância</SelectItem>
                  <SelectItem value="DAMAGE">Danificado / Vandalizado</SelectItem>
                  <SelectItem value="LOW_REFLETANCE">Baixa refletância</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>Selecione qual o estado em que a placa se encontra.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="pictures"
          key={'field.pictures'}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Fotos</FormLabel>
              <FormControl>
                <Input type="file" multiple />
              </FormControl>
              <FormDescription>Adicione fotos da placa.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="code"
          key={'field.code'}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Código ou Tipo</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o código ou tipo" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="MP1">MP1 - Marcador de Perigo Tipo 1</SelectItem>
                  <SelectItem value="A21e">A-21-e - Alargamento da pista à direita</SelectItem>
                  <SelectItem value="R19">R-19 - Velocidade máxima permitida</SelectItem>
                  <SelectItem value="MK">MK - Marcador Quilométrico</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>Selecione qual tipo de ocorrência.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="direction"
          key={`field.direction`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Direção</FormLabel>
              <FormControl>
                <Input placeholder="Ex: N" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="kilometer_position"
          key={`field.kilometer_position`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>KM</FormLabel>
              <FormControl>
                <Input placeholder="Ex: 206+850" {...field} />
              </FormControl>
              <FormDescription>Escreva em qual KM vc se encontra</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div>
          <h3 className="mb-4 font-bold text-lg">Medidas</h3>
          {fields.map((field, index) => (
            <div key={`medidas.${index}`}>
              <span className="mt-4 font-bold text-md">Nova medida</span>
              <FormField
                control={form.control}
                key={`${field.id}.${index}.film_type`}
                name={`measurements.${index}.film_type`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className={cn(index !== 0 && 'sr-only')}>Tipo da película</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o tipo da película" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="one">Película tipo I</SelectItem>
                        <SelectItem value="two">Película tipo II</SelectItem>
                        <SelectItem value="three">Película tipo III</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                key={`${field.id}.${index}.color`}
                name={`measurements.${index}.color`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className={cn(index !== 0 && 'sr-only')}>Cor da Placa</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o Cor da Placa" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="YELLOW">Amarela</SelectItem>
                        <SelectItem value="WHITE">Branca</SelectItem>
                        <SelectItem value="BLUE">Azul</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`measurements.${index}.minimum_value`}
                key={`${field.id}.${index}.minimum_value`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Valor mínimo</FormLabel>
                    <FormControl>
                      <Input type="string" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex gap-4 justify-between">
                <FormField
                  control={form.control}
                  key={`${field.id}.${index}.measures0`}
                  name={`measurements.${index}.measures.0`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>M1</FormLabel>
                      <FormControl>
                        <Input type="string" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  key={`${field.id}.${index}.measures1`}
                  name={`measurements.${index}.measures.1`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>M2</FormLabel>
                      <FormControl>
                        <Input type="string" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`measurements.${index}.measures.2`}
                  key={`${field.id}.${index}.measures2`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>M3</FormLabel>
                      <FormControl>
                        <Input type="string" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`measurements.${index}.measures.3`}
                  key={`${field.id}.${index}.measures3`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>M4</FormLabel>
                      <FormControl>
                        <Input type="string" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`measurements.${index}.measures.4`}
                  key={`${field.id}.${index}.measures4`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>M5</FormLabel>
                      <FormControl>
                        <Input type="string" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          ))}
          <Button
            type="button"
            variant="outline"
            size="sm"
            disabled={false}
            className="mt-2 w-full"
            onClick={() =>
              append({
                color: 'YELLOW',
                measures: [],
                average: '',
                minimum_value: '',
                film_type: '',
              })
            }
          >
            Adicionar medida
          </Button>
        </div>
        <Button type="submit" className="w-full">
          Reportar placa
        </Button>
      </form>
    </Form>
  );
}
