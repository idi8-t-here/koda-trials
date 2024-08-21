//This here is a sample page of the post login content
import { Separator } from "@/components/ui/separator";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function TodosPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  const { data: todos } = await supabase
    .from("profiles")
    .select()
    .order("inserted_at", { ascending: false });

  return (
    <section className="p-3 pt-6 max-w-2xl w-full flex flex-col gap-4">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        User's Fetched Data
      </h1>
      <Separator className="w-full " />
      <p>As you could see the user is successfully logged in and the users fetched data <br/> i.e the email is displayed </p>
    </section>
  );
}
