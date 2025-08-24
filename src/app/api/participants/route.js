let participants = [];

export async function GET() {
  return Response.json(participants);
}

export async function POST(request) {
  const { item } = await request.json();

  // validação no back
  if (!item || item.trim() === "") {
    return Response.json(
      { error: "O campo não pode estar vazio." },
      { status: 400 }
    );
  }

  if (participants.includes(item)) {
    return Response.json(
      { error: "Este item já foi adicionado." },
      { status: 400 }
    );
  }

  participants.push(item);

  return Response.json({ success: true, item });
}
