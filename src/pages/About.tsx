import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import PortfolioHeader from "@/components/PortfolioHeader";
import PortfolioFooter from "@/components/PortfolioFooter";
import SEO from "@/components/SEO";
import { fetchPexelsPhotos } from "@/services/pexels";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";

const contactSchema = z.object({
  name: z.string().trim().min(1, { message: "Name is required" }).max(100, { message: "Name must be less than 100 characters" }),
  email: z.string().trim().email({ message: "Invalid email address" }).max(255, { message: "Email must be less than 255 characters" }),
  message: z.string().trim().min(1, { message: "Message is required" }).max(1000, { message: "Message must be less than 1000 characters" }),
});

type ContactFormValues = z.infer<typeof contactSchema>;

const About = () => {
  const [portrait, setPortrait] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Message sent",
        description: "Thank you for your inquiry. We'll get back to you soon.",
      });
      form.reset();
      setIsSubmitting(false);
    }, 1000);
  };

  useEffect(() => {
    const loadPortrait = async () => {
      try {
        // Fetch a professional photographer portrait from Pexels
        const data = await fetchPexelsPhotos('PERSONAL', 1, 1); // Personal category has artistic portraits
        if (data.photos.length > 0) {
          const photo = data.photos[0];
          setPortrait({
            src: photo.src.large2x,
            alt: photo.alt || 'Portrait',
            width: photo.width,
            height: photo.height,
          });
        }
      } catch (err) {
        console.error('Error fetching portrait:', err);
      } finally {
        setLoading(false);
      }
    };

    loadPortrait();
  }, []);

  return (
    <>
      <SEO
        title="About - SIGNAL"
        description="SIGNAL is an AI product photography and creative studio specializing in synthetic product imagery and visual production for modern brands."
        canonicalUrl="/about"
      />

      <PortfolioHeader
        activeCategory=""
      />

      <main className="min-h-screen">
        <section className="max-w-[1600px] mx-auto pt-24 pb-12 md:pt-32 md:pb-16 px-4 md:px-8">
          <div className="text-center space-y-6 md:space-y-8 mb-12 md:mb-16 max-w-2xl mx-auto">
            <div className="space-y-3 md:space-y-4">
              <h1 className="font-playfair text-3xl md:text-5xl text-foreground">
                SIGNAL
              </h1>
              <p className="text-[9px] md:text-[10px] uppercase tracking-widest text-muted-foreground font-inter">
                FOUNDER & CREATIVE DIRECTOR: GOWTHAAMAN D
              </p>
            </div>

            {/* Portrait */}
            {!loading && portrait && (
              <div className="max-w-[240px] md:max-w-xs mx-auto border border-foreground/10 overflow-hidden shadow-sm">
                <picture className="relative block">
                  {portrait.width && portrait.height && (
                    <svg
                      width={portrait.width}
                      height={portrait.height}
                      viewBox={`0 0 ${portrait.width} ${portrait.height}`}
                      className="w-full h-auto"
                    >
                      <rect
                        width={portrait.width}
                        height={portrait.height}
                        fill="white"
                      />
                    </svg>
                  )}
                  <img
                    src={portrait.src}
                    alt={portrait.alt}
                    className="absolute top-0 left-0 w-full h-auto grayscale hover:grayscale-0 transition-all duration-700"
                    style={{
                      opacity: loading ? 0 : 1,
                      transition: 'opacity 0.5s ease-out'
                    }}
                  />
                </picture>
              </div>
            )}

            <div className="pt-4 space-y-2">
              <p className="text-xs md:text-sm font-inter text-foreground uppercase tracking-widest break-all px-4">
                <a href="mailto:gowthaamankrishna1998@gmail.com" className="hover:text-muted-foreground transition-colors">
                  gowthaamankrishna1998@gmail.com
                </a>
              </p>
              <p className="text-[10px] md:text-xs font-inter text-muted-foreground tracking-wider">
                <a href="tel:+918903162114" className="hover:text-foreground transition-colors">
                  +91 8903162114
                </a>
              </p>
            </div>
          </div>

          {/* Bio Section */}
          <div className="max-w-xl md:max-w-2xl mx-auto px-4 md:px-5 space-y-6 md:space-y-8 text-center text-foreground/80 text-[13px] md:text-sm leading-relaxed mb-16">
            <p>
              Creative Director and AI specialist focusing on premium synthetic product imagery.
              Based in India, Gowthaaman D blends technical innovation with a refined editorial aesthetic to create controlled commercial visuals for modern brands.
            </p>

            <p>
              Specializing in the intersection of traditional studio principles and advanced AI production,
              delivering high-end visual strategies that push the boundaries of product storytelling.
            </p>

            <div className="pt-6 md:pt-8 text-center">
              <h2 className="font-playfair text-lg md:text-xl text-foreground mb-3 md:mb-4 uppercase tracking-tight">Direct Contact</h2>
              <p className="text-foreground/70 text-[10px] md:text-xs uppercase tracking-wider leading-loose">
                Instagram / LinkedIn / Twitter / WhatsApp
              </p>
            </div>
          </div>

          {/* Contact Form Section */}
          <div className="max-w-xl mx-auto px-4 md:px-5 pt-8 md:pt-16 border-t border-foreground/5">
            <div className="text-center space-y-3 md:space-y-4 mb-10 md:mb-12">
              <p className="text-[9px] md:text-[10px] uppercase tracking-widest text-muted-foreground font-inter">
                INQUIRIES
              </p>
              <h2 className="font-playfair text-3xl md:text-5xl text-foreground">
                Inquiry
              </h2>
              <p className="text-foreground/80 text-[13px] md:text-sm leading-relaxed">
                For commercial collaborations and project discussions.
              </p>
            </div>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 md:space-y-8">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[10px] md:text-xs uppercase tracking-wider text-foreground/70 font-inter">
                        Name *
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Your name"
                          className="border-0 border-b border-foreground/20 rounded-none bg-transparent text-foreground px-0 focus-visible:ring-0 focus-visible:border-foreground transition-colors h-8 md:h-10 text-sm"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-[10px]" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[10px] md:text-xs uppercase tracking-wider text-foreground/70 font-inter">
                        Email *
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="your@email.com"
                          className="border-0 border-b border-foreground/20 rounded-none bg-transparent text-foreground px-0 focus-visible:ring-0 focus-visible:border-foreground transition-colors h-8 md:h-10 text-sm"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-[10px]" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[10px] md:text-xs uppercase tracking-wider text-foreground/70 font-inter">
                        Message *
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Discuss your project..."
                          className="border-0 border-b border-foreground/20 rounded-none bg-transparent text-foreground min-h-[100px] md:min-h-[150px] px-0 focus-visible:ring-0 focus-visible:border-foreground transition-colors resize-none text-sm"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-[10px]" />
                    </FormItem>
                  )}
                />

                <div className="pt-4 text-center">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    variant="outline"
                    className="w-full md:w-auto px-10 md:px-12 py-5 md:py-6 text-[10px] md:text-xs uppercase tracking-widest font-inter border-foreground/40 hover:bg-foreground hover:text-background transition-all"
                  >
                    {isSubmitting ? "Sending..." : "Start a Production"}
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </section>
      </main>

      <PortfolioFooter />
    </>
  );
};

export default About;
