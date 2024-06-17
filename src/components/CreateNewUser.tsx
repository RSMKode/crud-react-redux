import { Badge, Button, Card, TextInput, Title } from '@tremor/react';
import { useUserActions } from '../hooks/useUserActions';
import { useState } from 'react';

export default function CreateNewUser() {
  const { handleAddUser } = useUserActions();
  const [result, setResult] = useState<'ok' | 'ko' | null>(null);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setResult(null);

    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);

    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const github = formData.get('github') as string;
    // const { name, email, github } = Object.fromEntries(formData.entries());

    if (!name || !email || !github) return setResult('ko');

    handleAddUser({ name, email, github });
    setResult('ok');
    form.reset();
  };

  return (
    <Card className="flex flex-col gap-4">
      <Title>Crear Nuevo Usuario</Title>

      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <TextInput name="name" placeholder="Nombre" />
        <TextInput name="email" placeholder="Email" />
        <TextInput name="github" placeholder="Usuario de Github" />
        <div className="flex items-center gap-2 py-2">
          <Button type="submit">Crear</Button>
          <span>
            {result === 'ok' && (
              <Badge color="green">Guardado correctamente</Badge>
            )}
            {result === 'ko' && <Badge color="red">Error al crear</Badge>}
          </span>
        </div>
      </form>
    </Card>
  );
}
