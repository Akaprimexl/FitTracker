import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Plus } from "lucide-react";
import useWorkoutStore from "../store/useWorkoutStore";

const workoutSchema = z.object({
  ad: z
    .string()
    .trim()
    .min(1, "Məşq adı boş ola bilməz.")
    .max(60, "Məşq adı 60 simvoldan çox ola bilməz."),

  kateqoriya: z
    .string()
    .min(1, "Kateqoriya seçin."),

  muddet: z.coerce
    .number({
      message: "Müddət ədəd olmalıdır.",
    })
    .min(1, "Müddət ən azı 1 dəqiqə olmalıdır.")
    .max(1440, "Müddət 1440 dəqiqədən çox ola bilməz."),
});

export default function MesqForma() {
  const addWorkout = useWorkoutStore(
    (state) => state.addWorkout
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(workoutSchema),
    defaultValues: {
      ad: "",
      kateqoriya: "",
      muddet: "",
    },
  });

  const onSubmit = (data) => {
    addWorkout({
      ad: data.ad.trim(),
      kateqoriya: data.kateqoriya,
      muddet: Number(data.muddet),
    });

    reset();
  };

  return (
    <form className="workout-form" onSubmit={handleSubmit(onSubmit)}>
      <div className="form-header">
        <div>
          <h2>Yeni məşq əlavə et</h2>
          <p>Bugünkü məşqini qeyd et.</p>
        </div>

        <div className="form-icon">
          <Plus size={20} />
        </div>
      </div>

      <div className="form-grid">
        <div className="form-group">
          <label htmlFor="ad">Məşq adı</label>

          <input
            id="ad"
            type="text"
            placeholder="Məs: Səhər qaçışı"
            {...register("ad")}
          />

          {errors.ad && (
            <span className="error-message">
              {errors.ad.message}
            </span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="kateqoriya">Kateqoriya</label>

          <select
            id="kateqoriya"
            {...register("kateqoriya")}
          >
            <option value="">Kateqoriya seç</option>
            <option value="kardio">Kardio</option>
            <option value="guc">Güc</option>
            <option value="yoga">Yoga</option>
            <option value="gezinti">Gəzinti</option>
          </select>

          {errors.kateqoriya && (
            <span className="error-message">
              {errors.kateqoriya.message}
            </span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="muddet">Müddət</label>

          <div className="input-with-unit">
            <input
              id="muddet"
              type="number"
              min="1"
              placeholder="30"
              {...register("muddet")}
            />

            <span>dəq.</span>
          </div>

          {errors.muddet && (
            <span className="error-message">
              {errors.muddet.message}
            </span>
          )}
        </div>
      </div>

      <button className="primary-button" type="submit">
        <Plus size={19} />
        Məşq əlavə et
      </button>
    </form>
  );
}

