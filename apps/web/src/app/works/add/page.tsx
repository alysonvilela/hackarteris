'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
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

const profileFormSchema = z.object({
  ra: z
    .string({
      required_error: 'Digite o RA da placa.',
    })
    .min(2),
  status: z.string({
    required_error: 'Selecione o estado em que a placa se encontra.',
  }),
  pictures: z.any(),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

// This can come from your database or API.
const defaultValues: Partial<ProfileFormValues> = {
  ra: '',
  status: 'GOOD',
  pictures: [],
};

export default function AddWork() {
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
    mode: 'onChange',
  });

  function onSubmit(data: ProfileFormValues) {
    console.log(data);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="ra"
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
        <Button type="submit">Reportar placa</Button>
      </form>
    </Form>
  );
}
