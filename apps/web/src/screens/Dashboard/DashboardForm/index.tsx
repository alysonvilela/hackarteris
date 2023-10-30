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
import { DashboardIssuesProps } from '../DashboardIssue';

const addWorkFormSchema = z.object({
  // pictures: z.any(),

  measurements: z.array(
    z.object({
      color: z.string(),
      measures: z.array(z.string()).max(5),
      average: z.string().optional(),
      minimum_value: z.string(),
      film_type: z.string(),
    })
  ),
});

type AddWorkValues = z.infer<typeof addWorkFormSchema>;

// This can come from your database or API.
const defaultValues: Partial<AddWorkValues> = {
  measurements: [
    {
      color: '',
      film_type: '',
      measures: ['', '', '', '', ''],
      minimum_value: '',
      average: '',
    },
  ],
};

export const DashboardForm = ({ issue }: DashboardIssuesProps) => {
  const form = useForm<AddWorkValues>({
    resolver: zodResolver(addWorkFormSchema),
    defaultValues,
    mode: 'onChange',
  });

  async function onSubmit(data: AddWorkValues) {
    console.log('submit');
    const body = {
      author_name: 'John Doe', // Passado diretamente
      device_coord: ['10.1234', '20.5678'], // Passado diretamente
      pictures: [
        'https://cdn.autopapo.com.br/box/uploads/2018/08/29144427/shutterstock_520257244.jpg',
      ],
      status: 'OK',
      work_type: 'CONSERVATION', // Passado diretamente
      code: issue.reflector.props.code,
      direction: issue.reflector.props.direction,
      kilometer_position: issue.reflector.props.kilometer_position,
      measurements: data.measurements.map((measure) => {
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
      await axios.post(`http://localhost:3001/sign/${issue.id}`, body, {
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
      {/* <h1 className="font-bold text-2xl uppercase my-4">Reportar placa</h1> */}
      <Dialog open={modalOpen}>
        <DialogContent className="w-5/6 rounded-md">
          <DialogHeader className="my-6 gap-4">
            <DialogTitle>Placa reportada</DialogTitle>
            <DialogDescription>Obrigado! Sua placa foi reportada com sucesso! ✅</DialogDescription>
            <Button onClick={() => setModalOpen(false)}>Continuar</Button>
          </DialogHeader>
        </DialogContent>
      </Dialog>

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 text-gray-700">
        <FormField
          control={form.control}
          name="pictures"
          key={'field.pictures'}
          render={() => (
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

        <div className="m-0">
          <h3 className="mb-2 font-bold text-lg text-black">Medidas</h3>
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
        <tr className="h-[1px] max-w-[80%] w-full m-auto block bg-slate-200" />
        <Button type="submit" className="w-full bg-green-400">
          Concluir
        </Button>
      </form>
    </Form>
  );
};
