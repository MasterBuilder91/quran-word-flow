import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { Loader2, CheckCircle } from "lucide-react";
import { z } from "zod";

const applicationSchema = z.object({
  full_name: z.string().trim().min(2, "Name must be at least 2 characters").max(100, "Name must be less than 100 characters"),
  email: z.string().trim().email("Please enter a valid email").max(255, "Email must be less than 255 characters"),
  arabic_background: z.string().trim().min(20, "Please provide more detail about your Arabic background (at least 20 characters)").max(2000, "Arabic background must be less than 2000 characters"),
  years_experience: z.number().min(0, "Years must be 0 or more").max(50, "Please enter a valid number of years").optional(),
  why_apply: z.string().trim().min(50, "Please explain in more detail why you want to apply (at least 50 characters)").max(3000, "Response must be less than 3000 characters"),
});

interface ApplicationFormProps {
  applicationType: "coaching" | "careers";
  title: string;
  description: string;
}

export const ApplicationForm = ({ applicationType, title, description }: ApplicationFormProps) => {
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    arabic_background: "",
    years_experience: "",
    why_apply: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    // Validate
    const validationData = {
      full_name: formData.full_name,
      email: formData.email,
      arabic_background: formData.arabic_background,
      years_experience: formData.years_experience ? parseInt(formData.years_experience) : undefined,
      why_apply: formData.why_apply,
    };

    const result = applicationSchema.safeParse(validationData);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[err.path[0] as string] = err.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase.from("applications").insert({
        application_type: applicationType,
        full_name: result.data.full_name,
        email: result.data.email,
        arabic_background: result.data.arabic_background,
        years_experience: result.data.years_experience || null,
        why_apply: result.data.why_apply,
      });

      if (error) throw error;

      setIsSubmitted(true);
      toast({
        title: "Application Submitted",
        description: "We've received your application and will be in touch if there's a fit.",
      });
    } catch (error: any) {
      console.error("Application submission error:", error);
      toast({
        title: "Submission Failed",
        description: "There was an error submitting your application. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="bg-card border border-border rounded-2xl p-8 md:p-12 text-center">
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-foreground mb-2">Application Received</h3>
        <p className="text-muted-foreground">
          Thank you for your interest. We review applications manually and will be in touch if there's a potential fit.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-2xl p-8 md:p-12">
      <h3 className="text-2xl font-bold text-foreground mb-2">{title}</h3>
      <p className="text-muted-foreground mb-8">{description}</p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="full_name">Full Name *</Label>
            <Input
              id="full_name"
              value={formData.full_name}
              onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
              placeholder="Your full name"
              className={errors.full_name ? "border-red-500" : ""}
            />
            {errors.full_name && <p className="text-red-500 text-sm">{errors.full_name}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email *</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="your@email.com"
              className={errors.email ? "border-red-500" : ""}
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="years_experience">Years of Arabic Experience</Label>
          <Input
            id="years_experience"
            type="number"
            min="0"
            max="50"
            value={formData.years_experience}
            onChange={(e) => setFormData({ ...formData, years_experience: e.target.value })}
            placeholder="e.g., 5"
            className={errors.years_experience ? "border-red-500" : ""}
          />
          {errors.years_experience && <p className="text-red-500 text-sm">{errors.years_experience}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="arabic_background">Tell us about your Arabic background *</Label>
          <Textarea
            id="arabic_background"
            value={formData.arabic_background}
            onChange={(e) => setFormData({ ...formData, arabic_background: e.target.value })}
            placeholder="How did you learn Arabic? What's your current level? What methods have you used?"
            rows={4}
            className={errors.arabic_background ? "border-red-500" : ""}
          />
          {errors.arabic_background && <p className="text-red-500 text-sm">{errors.arabic_background}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="why_apply">
            {applicationType === "coaching" 
              ? "Why are you interested in this coaching? *" 
              : "Why do you want to become a coach? *"}
          </Label>
          <Textarea
            id="why_apply"
            value={formData.why_apply}
            onChange={(e) => setFormData({ ...formData, why_apply: e.target.value })}
            placeholder={
              applicationType === "coaching"
                ? "What are you hoping to achieve? What challenges have you faced with Arabic learning?"
                : "What makes you a good fit? How would you approach demystifying Arabic for English speakers?"
            }
            rows={5}
            className={errors.why_apply ? "border-red-500" : ""}
          />
          {errors.why_apply && <p className="text-red-500 text-sm">{errors.why_apply}</p>}
        </div>

        <Button
          type="submit"
          size="lg"
          disabled={isSubmitting}
          className="w-full bg-gold hover:bg-gold/90 text-background font-semibold text-lg py-6"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              Submitting...
            </>
          ) : (
            "Submit Application"
          )}
        </Button>

        <p className="text-muted-foreground text-sm text-center">
          Applications are reviewed manually. We'll respond if there's a potential fit.
        </p>
      </form>
    </div>
  );
};
