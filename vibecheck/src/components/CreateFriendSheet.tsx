import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useCreateFriend, getListFriendsQueryKey, getGetLeaderboardQueryKey } from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";

const schema = z.object({
  name: z.string().min(1, "Required"),
  username: z.string().min(1, "Required"),
  avatarColor: z.string().min(1, "Required"),
  upiId: z.string().optional(),
});

export function CreateFriendSheet({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const createFriend = useCreateFriend();

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      username: "",
      avatarColor: "#39FF14",
      upiId: "",
    },
  });

  const onSubmit = (data: z.infer<typeof schema>) => {
    createFriend.mutate({ data }, {
      onSuccess: () => {
        toast({ title: "Squad member added!" });
        queryClient.invalidateQueries({ queryKey: getListFriendsQueryKey() });
        queryClient.invalidateQueries({ queryKey: getGetLeaderboardQueryKey() });
        setOpen(false);
        form.reset();
      },
      onError: () => {
        toast({ title: "Failed to add", variant: "destructive" });
      }
    });
  };

  const colors = ["#39FF14", "#a855f7", "#3b82f6", "#ef4444", "#f59e0b", "#10b981"];

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        {children}
      </SheetTrigger>
      <SheetContent side="bottom" className="h-[80vh] bg-card border-t border-white/10 rounded-t-3xl sm:max-w-[390px] mx-auto">
        <SheetHeader>
          <SheetTitle className="text-2xl font-black uppercase italic">ADD TO SQUAD</SheetTitle>
        </SheetHeader>
        <div className="mt-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" className="bg-background border-white/10 h-12" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Username</FormLabel>
                    <FormControl>
                      <Input placeholder="johndoe" className="bg-background border-white/10 h-12" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="upiId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs font-bold text-muted-foreground uppercase tracking-widest">UPI ID (Optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="john@upi" className="bg-background border-white/10 h-12" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="avatarColor"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Avatar Color</FormLabel>
                    <div className="flex gap-2 mt-2">
                      {colors.map(color => (
                        <button
                          key={color}
                          type="button"
                          className={`w-10 h-10 rounded-full border-2 transition-transform ${field.value === color ? "scale-110 border-white" : "border-transparent"}`}
                          style={{ backgroundColor: color }}
                          onClick={() => field.onChange(color)}
                        />
                      ))}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" disabled={createFriend.isPending} className="w-full h-14 mt-4 text-lg font-black uppercase tracking-wider">
                {createFriend.isPending ? "Adding..." : "ADD TO SQUAD"}
              </Button>
            </form>
          </Form>
        </div>
      </SheetContent>
    </Sheet>
  );
}
